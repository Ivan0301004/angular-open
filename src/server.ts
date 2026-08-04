import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { AngularAppEngine } from '@angular/ssr';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ponytail: private API — host check off for testing (IP cambia cada deploy en Fargate).
// Ceiling: pierde la protección SSRF contra host spoofing; quitar antes de ir a prod.
AngularAppEngine.ɵdisableAllowedHostsCheck = true;

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine({
  allowedHosts: ['*']
});

// ↓↓↓ ESTE MIDDLEWARE ES LA CLAVE ↓↓↓
app.use((req, res, next) => {
  // Quita el puerto del header Host (ej: 13.223.235.66:4000 → 13.223.235.66)
  if (req.headers.host && req.headers.host.includes(':')) {
    req.headers.host = req.headers.host.split(':')[0];
  }
  next();
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
import http from 'node:http';
import { Socket } from 'node:net';

export default async (request) => {
  const { reqHandler } = await import('../../dist/open/server/server.mjs');

  // Build a Node.js IncomingMessage from the Netlify request
  const socket = new Socket();
  const req = new http.IncomingMessage(socket);

  // Override properties that IncomingMessage reads from the socket
  Object.defineProperty(req, 'url', { value: new URL(request.url).pathname + new URL(request.url).search, writable: false });
  Object.defineProperty(req, 'method', { value: request.method, writable: false });
  Object.defineProperty(req, 'headers', { value: Object.fromEntries(request.headers), writable: false });
  Object.defineProperty(req, 'httpVersion', { value: '1.1', writable: false });

  // Capture response
  let statusCode = 200;
  let responseHeaders = {};
  let body = '';

  const res = new http.ServerResponse(req);

  // Override write/end to capture body
  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);

  res.write = function (chunk, encoding, callback) {
    body += typeof chunk === 'string' ? chunk : chunk.toString();
    if (typeof encoding === 'function') callback = encoding;
    if (callback) callback();
    return true;
  };

  res.end = function (chunk, encoding, callback) {
    if (chunk) body += typeof chunk === 'string' ? chunk : chunk.toString();
    if (typeof encoding === 'function') callback = encoding;
    if (callback) callback();
    return this;
  };

  try {
    await reqHandler(req, res);
  } catch (err) {
    console.error('SSR Error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }

  // Collect headers set during rendering
  const finalHeaders = res.getHeaders();
  finalHeaders['content-type'] = finalHeaders['content-type'] || 'text/html; charset=utf-8';

  return new Response(body, {
    status: res.statusCode || 200,
    headers: finalHeaders,
  });
};

export const config = {
  path: '/*',
};

process.env.NG_ALLOWED_HOSTS = '*.vercel.app,angular-open.vercel.app';

export default async (req, res) => {
  try {
    console.log('SSR request:', req.url, 'host:', req.headers.host);
    const { reqHandler } = await import('../dist/open/server/server.mjs');
    return reqHandler(req, res);
  } catch (error) {
    console.error('SSR Error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};

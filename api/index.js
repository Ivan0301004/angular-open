export default async (req, res) => {
  try {
    const { reqHandler } = await import('../dist/open/server/server.mjs');
    return reqHandler(req, res);
  } catch (error) {
    console.error('SSR Error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};

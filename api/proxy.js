const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

module.exports = (req, res) => {
  if (req.url === "/") req.url = "/index.html";

  proxy.web(
    req,
    res,
    {
      target: process.env.S3_FOLDER,
      changeOrigin: true,
      proxyTimeout: 5000,
      secure: true,
    },
    (err) => {
      console.error("Proxy error:", err);
      res.statusCode = 502;
      res.end("Bad gateway");
    }
  );
};

proxy.on("proxyReq", (proxyReq) => {
  console.log("→ S3 request path:", proxyReq.path);
});
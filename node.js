const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "content-type": "text/html" });
    const html = fs.readFileSync("./index.html", "utf-8");
    const css = fs.readFileSync("./styles.css", "utf-8");
    const script = fs.readFileSync("./script.js", "utf-8");
    const modifiedHtml = html.replace("</head>", `<style>${css}</style></head>`).replace("</body>", `<script>${script}</script></body>`);

    res.end(modifiedHtml);
  })
  .listen(3000, () => {
    console.log("Running on port 3000");
  });

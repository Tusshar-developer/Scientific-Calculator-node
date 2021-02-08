const express = require("express");
const fs = require("fs");
const app = express();

const port = process.env.PORT || 2001;

const server = app.listen(port, (err) => {
  if (err) return `Error: ${err}`;
  console.log(`Listening on port ${port}`);
});

const loadHTMLPage = (route, req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile(route, (err, data) => {
    if (err) {
      res.write(`<h1>Error 404: \"${req.path}\" Not Found</h1>`);
    } else {
      res.write(data);
    }
    res.end();
  });
};

app.use("/", express.static("root"));

app.get("*", (req, res) =>
  loadHTMLPage("./Page Not Found/index.html", req, res)
);

const http = require("http");
const fs = require("fs");
//utils

function renderHtml(fileName, res) {
  let data = fs.readFileSync(fileName);
  res.end(data);
}
const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    //all get requests
    if (req.url == "/") {
      // let data=fs.readFileSync("./src/Register.html")
      // res.end(data)
      renderHtml("./src/Register.html", res);
    } else if (req.url == "/login") {
      renderHtml("./src/Login.html", res);
    } else if (req.url.endsWith(".css")) {
      let fileName = req.url.slice(1);
      renderHtml(`./src/${fileName}`, res);
    }
  } else if (req.method == "POST") {
    //all post requests
    if (req.url == "/submit-register") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        console.log(data);
        res.end("Data Recieved, See console for data");
      });
    }
  } else {
    res.end("no route found");
  }
});

server.listen(4400, () => {
  console.log("Server Started!");
});

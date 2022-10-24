
const http = require("http");
const fs = require("fs");
const path = require("path");
const authenticate = require("./authentication");
const fullpath = path.join(__dirname, "msg.js");
console.log(fullpath);
let port = 4000;

function requestHandler(req, res) {
  if (req.url === "/books" && req.method === "GET") {
    authenticate(req,res)
    .then(() => {
        addAllBooks(req, res);
    }).catch((err) => {
        res.writeHead(404);
        res.end(JSON.stringify({
            message : err
        }));
    })
 
  } else if (req.url === "/books" && req.method === "POST") {
    addNewBook(req, res);
  } else if (req.url === "/books" && req.method === "PUT") {
    updateBook(req, res);
  } else if (req.url === "/books" && req.method === "DELETE") {
    deleteBook(req, res);
  }
}

function addAllBooks(req, res) {
  fs.readFile(fullpath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(404);
      console.log(err);
      res.end('Couldn"t load all books');
    }
    res.end(data);
  });
}

function addNewBook(req, res) {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
    console.log(body);
  });
  req.on("end", () => {
    const bufferTostring = Buffer.concat(body).toString();
    console.log(bufferTostring);

    fs.readFile(fullpath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404);
        console.log(err);
        res.end('Couldn"t load all books');
      }
      let oldData = JSON.parse(data);
      let newData = JSON.parse(bufferTostring);
      const newBookdataIndex = oldData.push(newData);
      const display = [...oldData];
      console.log(display);

      fs.writeFile(fullpath, JSON.stringify(oldData), (err) => {
        if (err) {
          console.log(err);
          res.end("error has occured");
        }
        console.log("Book successfully added");
        res.end(JSON.stringify(newData));
      });
    });
  });
}

function updateBook(req, res) {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
    console.log(body);
  });
  req.on("end", () => {
    const bufferTostring = Buffer.concat(body).toString();
    const newData = JSON.parse(bufferTostring);
    const newBookIndex = newData.id;

    fs.readFile(fullpath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404);
        console.log(err);
        res.end('Couldn"t load all books');
      }
      let oldData = JSON.parse(data);
      let compareIndex = oldData.findIndex(
        (oldDataObject) => oldDataObject.id === newBookIndex
      );
      if (compareIndex === -1) {
        res.writeHead(500);
        console.log("error occured in loading");
        res.end('error in looking for index');
        return;
      }
      const updateNow = { ...oldData[compareIndex], ...newData };
      oldData[compareIndex] = updateNow;

      fs.writeFile(fullpath, JSON.stringify(oldData), (err) => {
        if (err) {
         res.writeHead(404);
          console.log(err);
          res.end("error has occured since Id is not found");
        }
        console.log("Book successfully added");
        res.end(JSON.stringify(newData));
      });
    });
  });
}

function deleteBook(req,res){
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(body);
    });
    req.on("end", () => {
      const bufferTostring = Buffer.concat(body).toString();
      const newData = JSON.parse(bufferTostring);
      const newBookIndex = newData.id;
  
      fs.readFile(fullpath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404);
          console.log(err);
          res.end('Couldn"t load all books');
        }
        let oldData = JSON.parse(data);
        let compareIndex = oldData.findIndex(
          (oldDataObject) => oldDataObject.id === newBookIndex
        );
        if (compareIndex === -1) {
          res.writeHead(500);
          console.log("error occured in loading");
          res.end('error in looking for index');
          return;
        }
      
         oldData.splice(compareIndex,1);
        console.log(oldData);
  
         fs.writeFile(fullpath, JSON.stringify(oldData), (err) => {
           if (err) {
            res.writeHead(404);
             console.log(err);
             res.end("error has occured since Id is not found");
           }
           console.log("Book successfully added");
           res.end(JSON.stringify(newData));
         });
      });
    });
}
const server = http.createServer(requestHandler);
server.listen(port, function () {
  console.log(`server successfully stated at http://localhost:${port}`);
});


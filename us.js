
import express from "express";
import fs from "fs/promises";

var port = 8080;
var app = express();

app.use(express.json());

app.get("/read", async (req, res) => {
  try {
    // get file - it returns a string
    let file = await fs.readFile("./bookstore.json", "utf8");

    res.status(200).json({ Books: JSON.parse(file) });
  } catch (err) {
    console.log(err);
    return;
  }
});

app.post("/read", async (req, res) => {
  const { title, author } = req.body;
  const newContent = { title, author };


  try {
    // get file - it returns a string
    let file = await fs.readFile("./bookstore.json", "utf8");

    // parse content - to json
    let content = JSON.parse(file);

    // push content - push new content
    content.push(newContent);

    // write to file
    await fs.writeFile(`./book.json`, JSON.stringify(content));

    res.status(201).json({ message: "Book added" });
  } catch (err) {
    console.log(err);
    return;
  }
});

app.listen(port, () => {
  console.log(`listening on port: ${port} `);
});
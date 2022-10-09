import express from 'express'
import cors from 'cors'
import path from 'path'
const app = express()
app.use(cors())
app.use(express.json())
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public/build/")));
const messages = [];

app.post("/setMessage", (req, res) =>{
  if(messages.length > 100){
    messages = [];
  }
  messages.push(req.body.text)
  res.status(200);
  res.send(req.body);
});
app.get("/getMessages", (req, res) => {
  res.send(messages);
});
app.get("/getLastMessage", (req, res) => {
  if(messages.length === 0){
    res.send("No messages... :(");
  } else {
    res.send(messages[messages.length - 1]);
  }
});


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})

app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "public/build/") });
});
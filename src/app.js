const express = require("express");

const app = express();

// GET Request

app.get("/user/:userId/:name/:password", (req, res) => {
  res.send({firstName : "Parm", LastName : "Musale"});
});

app.get("/user", (req, res) => {
  res.send("Hello Parm Dev From GET Server");
});
// POST Request
app.post("/user", (req, res) => {
  res.send("Hello Parm Dev From POST Server");
});
// DELETE Request
app.delete("/user", (req, res) => {
  res.send("Delete Parm Dev From POST Server");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

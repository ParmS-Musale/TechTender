const express = require("express");

const app = express();

app.use("/parm",(req, res) => {
  res.send("Hello Parm Dev From Server");
});
app.use("/dev",(req, res) => {
  res.send("Hello Parm From Server");
});
app.use("/pm",(req, res) => {
  res.send("Hello Parm From Server");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

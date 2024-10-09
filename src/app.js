const express = require("express");

const app = express();

// USE Request For All And The Order is also Mattter

app.use(
  "/user",
  (req, res, next) => {
    console.log(`New Request Received: ${req.method} ${req.url}`);
    // res.send("Hello Parm Dev from  request 1");
    next();
  },
  (req, res, next) => {
    console.log(`New Request Received: ${req.method} ${req.url}`);
    // res.send("Hello Parm Dev  form request 2");
    next();
  },
  (req, res, next) => {
    console.log(`New Request Received: ${req.method} ${req.url}`);
    // res.send("Hello Parm Dev  form request 3");
    next();
  },
  (req, res) => {
    console.log(`New Request Received: ${req.method} ${req.url}`);
    res.send("Hello Parm Dev  form request 4");
  }
);

// GET Request
app.get("/user/:userId/:name/:password", (req, res) => {
  res.send({ firstName: "Parm", LastName: "Musale" });
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

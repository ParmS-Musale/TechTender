const adminAuth = (req, res, next) => {
  console.log("Admin Auth is Checking...");
  const token = "ParmDev";
  const isAdminAuthorized = token === "ParmDev";
  if (!isAdminAuthorized) {
    res.status(401).send("unauthorized access");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User Auth is Checking...");
  const token = "ParmDev";
  const isAdminAuthorized = token === "ParmDev";
  if (!isAdminAuthorized) {
    res.status(401).send("unauthorized access");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };

const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./database/conn");
const userroute = require("./routes/userRouter");
const notesroute = require("./routes/notesroute");
const { notFound, errorHandler } = require("./middlewares/erroerhandlers");
const app = express();

dotenv.config();
const port = process.env.PORT || 5000;
connectdb();

app.use(express.json());

app.use("/api/users", userroute);
app.use("/api/notes", notesroute);
//-------------
// const cors = require("cors");

// app.use(cors({ origin: "*" }));
//------------
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://beautiful-lollipop-83129c.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});
//-------------

// Add headers
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });
//---------------

app.get("/", (req, res) => {
  res.send("Hello world");
});

//for error messages from middleware
app.use(notFound);
app.use(errorHandler);

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });
app.listen(port, () => {
  console.log(`server is listing at port ${port}..`);
});

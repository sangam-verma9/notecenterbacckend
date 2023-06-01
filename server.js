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
const cors = require("cors");

app.use(cors());
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

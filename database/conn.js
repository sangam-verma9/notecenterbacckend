const mongoose = require("mongoose");

//***connect local data base***
// mongoose.set("strictQuery", false);
// const connectdb = async () => {
//   try {
//     mongoose
//       .connect("mongodb://127.0.0.1:27017/Notezipper")
//       .then(() => {
//         console.log("connection succesfully created...");
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };
// module.exports = connectdb;

//** connect remote database***

// const DB = process.env.MONGO_URI;
const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongodb connected ${conn}`);
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectdb;

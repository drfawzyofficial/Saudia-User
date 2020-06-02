// Connection on localhost
const mongoose = require("mongoose");
(async() => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tatx", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error(err.message);
  }
})()
// Connection on Server
// const mongoose = require("mongoose");
// (async () => {
//   try {
//     await mongoose.connect(
//       `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`,
//       {
//         auth: { authSource: "admin" },
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//       }
//     );
//     console.log("Connected to mongoDB");
//   } catch (err) {
//     console.error(err.message);
//   }
// })()
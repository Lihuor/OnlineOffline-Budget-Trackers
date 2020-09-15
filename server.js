const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// const url = process.env.MONGO_URL || 'mongodb://localhost/budget';
// mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
//   .then(async() =>{
//     // await db.bootstrap();
//     await app.listen(PORT);
//     console.log(`app running on port ${PORT}`);
//   })

// .catch(error => console.error(error));

mongoose.connect(process.env.MONGO_URL ||"mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
var express = require("express");
var app = express();
var cors = require("cors");
let projectCollection;
let dbConnet = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");
let http = require("http").createServer(app);
let io = require("socket.io")(http);
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/projects", projectRoutes);

app.get("/addTwoNumbers/:firstNumber/:secondNumber", function (req, res, next) {
  var firstNumber = parseInt(req.params.firstNumber);
  var secondNumber = parseInt(req.params.secondNumber);
  var result = firstNumber + secondNumber || null;
  if (result == null) {
    res.json({ result: result, statusCode: 400 }).status(400);
  } else {
    res.json({ result: result, statusCode: 200 }).status(200);
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});

//mongodb connection....
// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://shamail:1234@cluster0.9znjkrk.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// const createCollection = (collectionName) => {
//   client.connect((err, db) => {
//     projectCollection = client.db().collection(collectionName);
//     if (!err) {
//       console.log("MongoDb connected succesfully");
//     } else {
//       console.log("Db Error:", err);
//       process.exit(1);
//     }
//   });
// };

// //insert project...
// const insertProjects = (project, callback) => {
//   projectCollection.insert(project, callback);
// };

// //post api...
// app.post("/api/projects", (req, res) => {
//   console.log("New Project added", req.body);
//   var newProject = req.body;
//   insertProjects(newProject, (err, result) => {
//     if (err) {
//       res.json({ statusCode: 400, message: err });
//     } else {
//       res.json({
//         statusCode: 200,
//         message: "Project Successfully added",
//         data: result,
//       });
//     }
//   });
// });
// // const cardList = [
// //   {
// //     title: "BMW 1998",
// //     image: "images/image4.jpg",
// //     link: "BMW 1998",
// //     desciption: "Demo desciption about BMW 1998",
// //   },
// //   {
// //     title: "BMW 1995",
// //     image: "images/image5.jpg",
// //     link: "Italian Model",
// //     desciption: "Demo desciption about BMW 1995",
// //   },
// // ];

// const getProjects = (callback) => {
//   projectCollection.find({}).toArray(callback);
// };

// app.get("/api/projects", (req, res) => {
//   getProjects((err, result) => {
//     if (err) {
//       res.json({ statusCode: 400, message: err });
//     } else {
//       res.json({ statusCode: 200, message: "Success", data: result });
//     }
//   });
// });

var port = process.env.port || 3000;
http.listen(port, () => {
  console.log("App listening to: " + port);
  //createCollection("Vehicles");
});

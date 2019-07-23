const expressEdge = require("express-edge");
const express = require("express");
const edge = require("edge.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const calculatorController = require("./controllers/calculator");
const bmiController = require("./controllers/bmi");
const bmrController = require("./controllers/bmr");
const gydController = require("./controllers/gyd");
const updatePageController = require("./controllers/updatePage");
const updateController = require("./controllers/update");
const blogController = require("./controllers/blog");
const messageController = require("./controllers/messageSave")
const app = new express();
mongoose.connect("mongodb://admin:admin123@ds253857.mlab.com:53857/gyd");

app.use(connectFlash());

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storePost = require("./middleware/storePost");
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/auth/logout", auth, logoutController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", auth, storePost, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/about",aboutController);
app.get("/contact",contactController);
app.get("/calculator",calculatorController);
app.get("/bmi",bmiController);
app.get("/bmr",bmrController);
app.get("/gyd",gydController);
app.get("/profile/update/:id",auth,updatePageController);
app.post("/users/update/:id",auth,updateController);
app.get("/blog",blogController);
app.post("/message",messageController);
app.use((req, res) => res.render('not-found'));

app.listen(5000, () => {
  console.log("App listening on port 5000");
});

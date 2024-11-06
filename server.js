const express = require("express");
const app = express();
const userRoutes = require("./routers/user");
const adminRoutes = require("./routers/admin");
const path = require("path");
const connectdb = require("./db/connectdb");
const session = require("express-session");
const nocache = require("nocache");

//======================================>

app.use(nocache());
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//===========>
//view engine

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//static assets
app.use(express.static("public"));

//=====================>

//================>
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

//==============>
connectdb();


app.get('/*',(req,res)=>{
  res.render('error/errorpage')
})




//port for server
app.listen(3000, () => {
  console.log("login server is running on http://localhost:3000/user/login");
  console.log("register server is running on http://localhost:3000/user/register");
  console.log("admin server is running on http://localhost:3000/admin/login");
});

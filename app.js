require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnect = require("./db");
// const jwt = require("jsonwebtoken");

app.use(Express.json());
app.use(require("./middleware/headers"));

const controllers = require("./controllers");

app.use("/user", controllers.userController);
// app.use(require("./middleware/jwtValid"));
app.use("/concerts", controllers.concertController);
app.use("/comment", controllers.commentController);

dbConnect.authenticate()
    .then(()=>dbConnect.sync())
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log(`[Server]: App is listening on port ${process.env.PORT}.`);
    });
})
.catch((err)=>{
    console.log(`[Server]: Server crashed. Error=${err}`);
});
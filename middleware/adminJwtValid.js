const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");
// const { values } = require("sequelize/types/lib/operators");
const {models} = require("../models");




const adminJwtValid = async (req, res, next) =>{
    if(req.method == "OPTIONS") {
        next();
    } else if(
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
        ){
            const {authorization} = req.headers;
            // console.log("authorization>>>", authorization);
            const payload = authorization 
            ? jwt.verify(authorization.includes("Bearer") 
            ? authorization.split(" ")[1] 
            : authorization, process.env.JWT_SECRET)
            : undefined;

            console.log("payload>>>", payload);

            if(payload) {
                let foundUser = await models.UserModel.findOne({where:{id: payload.id, role: "admin"}});
                console.log("foundUser>>>", foundUser);

                if (foundUser){
                // console.log("request>>>", req);    
                req.user = foundUser;
                next();
            } else {
                res.status(400).send({message: "User not Authorized"});
            }
        } else {
            res.status(401).send({message: "Token Invalid"});
        }
    } else {
        res.status(403).send({message: "Forbidden"});
    }
};

module.exports = adminJwtValid;
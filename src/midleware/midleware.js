const jwt = require("jsonwebtoken");



    let auth = async function(req,res,next){

        try{
        let token = req.headers["x-api-key"]
        if(token){
            let decodedToken = jwt.verify(token , "secret-key" )      
            if(decodedToken){

           req.decodedToken = decodedToken
            next()
            
            }

        }

    }catch(err){
        return res.status(500).send({ERROR:err.message})}
}
   
module.exports.auth=auth
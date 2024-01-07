const fs = require("fs")

function logMiddleware(req,res,next){
    fs.appendFileSync("log.txt", "Se registró una visita a la página " + req.url)
    next();
}

module.exports = logMiddleware;
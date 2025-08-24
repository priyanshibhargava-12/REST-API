const fs = require('fs');

function logReqRes(filename) {
    return (err,req, res, next) => {
        fs.appendFile(filename, `${req.method} ${req.url}\n`, (err) => {
            if (err) {
                console.error("Could not log request", err);
            }
        });
        next();
    };
}
module.exports = {logReqRes};
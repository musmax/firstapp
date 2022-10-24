const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");
const fullpath = path.join(__dirname,"users.json");

function authenticate(req,res) {
    return new Promise((resolve,reject) => {
        const body = [];
        req.on('data',(chunk) => {
            body.push(data);
        });
        req.on('end',() => {
            let dataObject = Buffer.concat(body).toString();
            if (!dataObject){
                reject('No username or password provided');
            }
            const parsedObject = JSON.parse(dataObject);
            console.log(parsedObject);
        });
    });
}

module.exports = {
    authenticate
}
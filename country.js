const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 4000;
let server = http.createServer();
server.listen(port,() => {
    console.log(`server successfully created listening at http://localhost:${port}`);
});
// let fs = require('fs');
// let path = require('path');
// let dirPath = path.join(__dirname,'files','jotter.txt.json');


// fs.open(dirPath,'r',(err,fd) => {
//     if (err){
//         console.log('error' + err);
//         return;
//     }
//     fs.readFile(fd,'utf-8',(err,data) => {
//         if (err) {
//             console.log('error' + err); 
//         }
//         console.log(data);
//     });

// });

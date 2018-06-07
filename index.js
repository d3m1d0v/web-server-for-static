const path = require('path');
const fs = require('fs');
const express = require('express');
const PORT = 1337;

console.log("Please, enter path to directory or file:");
process.stdin.addListener("data", function(data) {
    try {
        let fpath = data.toString().trim();
        if (fpath === "") {
            console.log("You didn't enter anything. Please, try again...");
            return;
        }
        
        fpath = path.normalize(fpath);
        let stats = fs.lstatSync(fpath);
        
        if (stats.isDirectory()) {
            console.log("This is directory.");
        } else if (stats.isFile()) {
            console.log("This is file.");
        }

        startServer(fpath);
        process.stdin.destroy();
    } catch(err) {
        console.log("Error via reading dir or file. Please, try again...");
    }
});

function startServer(path) {
    express()
        .use('/static', express.static(path))
        .listen(PORT, () => console.log('Server started on port ' + PORT));
}

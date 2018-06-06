if (process.argv.length <= 2) {
    console.log("Path to dir doesn't found in first command line argument\nExit");
    process.exit(0);
}

const path = require('path');
const fs = require('fs');

let npath = path.normalize(process.argv[2]);
if (!fs.existsSync(npath)) {
    console.log("Error via reading the directory\nExit");
    process.exit(0);
}

console.log("Listing directory (files only):");
fs.readdirSync(npath)
    .filter(item => fs.lstatSync(path.join(npath, item)).isFile())
    .forEach(i => console.log("\t" + i));

const express = require('express');
const app = express();
const PORT = 1337;

app.use('/files', express.static(npath));
app.listen(PORT, () => {
    console.log('\nServer started on port ' + PORT);
});

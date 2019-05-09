const fs = require('fs')
const path = require('path')
const inputPath = process.argv[2]

try {
    fs.accessSync(path.resolve(inputPath), fs.constants.F_OK)
    let state = fs.statSync(inputPath)
    if(state.isDirectory()) {
        console.log(`is directory`);
        let files = fs.readdirSync(inputPath);
        console.log(`${files}`)
    } else if(state.isFile()) {
        console.log(`is file`)
    }
}catch(e) { 
    console.log(`path is not right`)
}
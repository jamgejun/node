const fs = require('fs')

fs.readdir('file', {
    withFileTypes: true,
    encoding:'utf-8'
}, (err,Dirent) => {
    console.log(`${Dirent}`)
})

fs.watch('file/a.txt', {
    encoding: 'utf-8'
}, (eventType, filename) => {
    console.log(`eventType: ${eventType}+filename: ${filename}`)
})
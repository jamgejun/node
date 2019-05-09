const path = require('path');
// path 在node.exe中。

// 3段来自不同用户的输入 one two three


const myPath = path.join(__dirname, "//one//", "two", "///three///")

console.log(myPath)
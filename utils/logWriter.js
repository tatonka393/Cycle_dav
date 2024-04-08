const fs = require('fs').promises
const path = require('path')

const logPath = path.join(__dirname,'log')


async function addToLog(func,args){
    try{
       await fs.appendFile(logPath,`${new Date().toUTCString()} : ${func} ${args} \n`)
    }catch(e){
        console.log(e)
    }
}
module.exports = addToLog
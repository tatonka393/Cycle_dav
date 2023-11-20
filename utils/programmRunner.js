var child_process = require('child_process')
var child;
var t_data = ''
const start = function(){
    console.log("timur on")
    if(child == undefined || !child.connected){
        child = child_process.execFile('node test12.js', []); 
        child.unref(); 
        // use event hooks to provide a callback to execute when data are available: 
        child.stdout.on('data', function(data) {
            t_data = data.toString()
            //console.log(d) 
        });
    }
}
const stop = function(){
    console.log("timur off")
    if(child!=undefined){
    console.log("i will kill you bitch")
	child.kill('SIGHUP');	
    }
}
// start()
module.exports = {start,stop,data:t_data}
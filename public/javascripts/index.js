import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
var monpressure
const socket = io();
socket.on("connect", () => {
// ...
console.log('dsdssd')
});
// setInterval(()=>{
//   socket.emit("hello", "world", (response) => {
// console.log(response); // "got it"
// });
// console.log('dsd')
// },1000)
let pressure = document.getElementById('pressure');
let stage_p = document.getElementById('stage');
let cycles = document.getElementById('cycles');
let pressureRange = document.getElementById('pressureRange');
let pause = document.getElementById('pause')
socket.on('monometr',(arg)=>{
    pressure.textContent = "давление " + arg.pressure;
    cycles.textContent = "цикл " + arg.curent_cycle + " из " + arg.cycle_count; 
    pressureRange.textContent = "границы давления от " + arg.bot_pressure + " до " + arg.top_pressure;
    pause.textContent = `верхняя пауза - ${arg.top_pause} секунд, нижняя пауза - ${arg.bot_pause} секунд`
    changeStage(arg.stage)
    monpressure = arg.pressure
    addData(monpressure)

})
//0 - остановлен, 1 - набор давления, 2 - верхняя пауза, 3 - стравить  давление, 4 - нижняя пауза 
function changeStage(stage){
    let str = ''
    switch(stage){
        case 0:
            str = 'остановлен'
        break
        case 1:
            str = 'набор давления'
        break
        case 2:
            str = 'верхняя пауза'
        break
        case 3:
            str = 'стравливание давления'
        break
        case 4:
            str = 'нижняя пауза '
        break       
    }
    stage_p.textContent = "стадия цикла - " + str;
}
//setInterval(()=>{addData(monpressure)},1000)


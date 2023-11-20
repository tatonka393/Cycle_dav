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
let sensor = document.getElementById('sensor');
let stage_p = document.getElementById('stage');
let cycles = document.getElementById('cycles');
let pressureRange = document.getElementById('pressureRange');
let pause = document.getElementById('pause')
socket.on('monometr',(arg)=>{
    sensor.textContent = "Номера сенсоров " + arg.sensor_number
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
const terminalArr = [];
let termik = document.getElementById('terminal');
termik.setAttribute('style', 'white-space: pre;');
function terminalOut(data){
  terminalArr.push(data)
  if(terminalArr.length > 10){
    terminalArr.shift()
  }
  let msg = ''
  for(let item of terminalArr){
    msg += item + "\n";
  }
  
 termik.textContent = msg;
}

//setInterval(()=>{terminalOut("penis")},1000)
//setInterval(()=>{addData(monpressure)},1000)

//document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  //});
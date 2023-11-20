var express = require('express');
var router = express.Router();
const cycle = require('./../utils/cycle')
const mon = require('./../utils/monometr')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '♥♥♥♥♥♥ЦИКЛЫ♥♥♥♥♥♥' });
});

router.get('/command:value',async (req,res)=>{
  console.log(req.params.value)
  let alert = false
  let message = req.params.value
  switch(req.params.value){
    case 'start':
      if(cycle.sensor_number.length==0)
      {
        alert = true
        message = 'укажите номер сенсора'
        break
      }
      cycle.startLoop()
    break
    case 'stop':
      cycle.stopLoop()
      cycle.sensor_number = ''
    break
    case 'pause':
      cycle.pauseLoop()
    break
    case 'up':
      cycle.upPressure()
    break
    case 'down':
      cycle.downPressure()
    break
    case 'save':
      message = await cycle.saveSettings()
      alert = true
    break
    case 'read':
      message = await cycle.readSettingsFromFile()
      alert = true
    break
  }
  res.send({message,alert})
})

router.get('/pressure_arr',async (req,res)=>{
  res.send(mon.pressure_arr)
})

router.post('/settings', async (req,res)=>{
  console.log(req.body)
  if(cycle.stage!=0){
    res.send({message:"Для изменения настроек остановите циклы и убедитесь что вы не дурак и все ввели правильно!"})
    return
  }
  cycle.sensor_number = req.body.sensor_name
  cycle.setBotPause(req.body.bot_pause)
  cycle.setTopPause(req.body.top_pause)
  cycle.setBotPressure(req.body.bot_pressure)
  cycle.setTopPresure(req.body.top_pressure)
  cycle.setCycleCount(req.body.cycle_count)
  res.send({message:'Настройки записаны'})
})

module.exports = router;

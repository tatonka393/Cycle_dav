var express = require('express');
var router = express.Router();
const cycle = require('./../utils/cycle')

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
      cycle.startLoop()
    break
    case 'stop':
      cycle.stopLoop()
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

router.post('/settings', async (req,res)=>{
  console.log(req.body)
  cycle.setBotPause(req.body.bot_pause)
  cycle.setTopPause(req.body.top_pause)
  cycle.setBotPressure(req.body.bot_pressure)
  cycle.setTopPresure(req.body.top_pressure)
  cycle.setCycleCount(req.body.cycle_count)
  res.send({message:'Настройки записаны'})
})

module.exports = router;

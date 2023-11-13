const mon = require('./monometr')
const enginedb = require('./database')
const engineuart = require('./kvsm_uart')
const fs = require('fs').promises
const path = require('path')
class LOOP{
        constructor(){
        this.sensor_number = ''
        this.cycle_count = 100
        this.curent_cycle = 0
        this.top_pressure = 30
        this.bot_pressure = 5
        this.cycle_interval
        this.panic_interval
        this.working_timeout
        this.top_pause = 300
        this.bot_pause = 60
        this.stage = 0 //0 - остановлен, 1 - набор давления, 2 - верхняя пауза, 3 - стравить  давление, 4 - нижняя пауза 
        this.config_path = path.join(__dirname,'..','config')
        this.initDevices()
        this.readSettingsFromFile()
        this.panicInterval()
        
    }
    async initDevices(){
        try {
            mon.startSurvey()
            engineuart.Create()
        } catch (error) {
            console.log(e)
        }
    }
    startLoop(){
        enginedb.engineOn()
        this.rotationInterval()
    }
    stopLoop(){
        engineuart.stop()
        enginedb.engineOff()
        this.curent_cycle = 0 
        this.stage = 0
        clearInterval(this.cycle_interval)
    }
    pauseLoop(){
        engineuart.stop()
        enginedb.engineOff()
        clearInterval(this.cycle_interval)
    }
    upPressure(){
        enginedb.stepForvard()
        enginedb.engineOn()
        engineuart.start(1)
    }
    downPressure(){
        enginedb.stepBack()
        enginedb.engineOn()
        engineuart.start(1)
    }
    setBotPressure(new_value){
        if(new_value<4||new_value>100){
            this.bot_pressure = 4;
            return
        }
        this.bot_pressure = new_value
    }   
    setTopPresure(new_value){
        if(new_value<1||new_value>100){
            this.top_pressure = 100
            return
        }
        
        // if(new_value<this.bot_pressure || this.bot_pressure >= this.top_pressure){
        //     this.top_pressure = this.bot_pressure + 1
        //     return
        // }
        this.top_pressure = new_value
    }
    setCycleCount(new_value){
        if(new_value<1||new_value>100)
            return
        this.cycle_count = new_value
    }
    setTopPause(new_value){
        if(new_value<10||new_value>600)
            return
        this.top_pause = new_value
    }
    setBotPause(new_value){
        if(new_value<10||new_value>600)
        return
        this.bot_pause = new_value
    }

    rotationInterval(){
        this.cycle_interval = setInterval(async()=>{
            console.log('this.curent_cycle',this.curent_cycle)
            console.log('this.stage',this.stage)
            if(this.stage == 0)
            {
                this.stage = 1
                await enginedb.stepForvard()
                await enginedb.engineOn()
                engineuart.start(1)
                this.workingTimeout()
                return             
            }
            if(this.stage == 1 && mon.pressure >= this.top_pressure)
            {   
                clearTimeout(this.working_timeout)
                this.stage = 2
                engineuart.stop()
                await enginedb.engineOff()
                await enginedb.stepBack()
                this.pauseTimeout(this.top_pause*1000)//300000)
                return
            }
            if(this.stage == 3 && mon.pressure <=this.bot_pressure)
            {
                clearTimeout(this.working_timeout)
                this.stage = 4
                engineuart.stop()
                await enginedb.engineOff()
                await enginedb.stepForvard()
                this.pauseTimeout(this.bot_pause*1000)//60000)
                return
            }
            // if((this.stage==1&&(this.top_pressure - mon.pressure)<=5)||(this.stage==3&&(mon.pressure - this.bot_pressure)<=5))
              //  engineuart.start(3)

        },200)
    }
    panicInterval(){
        this.panic_interval = setInterval(async ()=>{
            if(mon.pressure >= 110){
                engineuart.stop()
                await enginedb.engineOff()
                console.log("превышено макс давление")
            }
            if(mon.err_state){
                engineuart.stop()
                await enginedb.engineOff()
                console.log("монометр не отвечает")
            }
        },100)
    }
    workingTimeout(){
        this.working_timeout = setTimeout(async ()=>{
            engineuart.stop()
            await enginedb.engineOff()
            this.stage = 0
            clearInterval(this.cycle_interval)
            console.log('Таймаут времени вращения двигателя')
        },75000)
    }
    pauseTimeout(time){
        console.log("start ", time/60000 ," min timeout")  
        setTimeout(async ()=>{
            if(this.stage == 2){
                this.stage = 3
                await enginedb.engineOn()
                engineuart.start(1)
                this.workingTimeout()
            }
            if(this.stage == 4)
                if(this.curent_cycle >= this.cycle_count)
                {
                    clearInterval(this.cycle_interval)
                    this.stage = 0
                }
                else{
                    this.curent_cycle ++
                    this.stage = 1
                    await enginedb.engineOn()
                    engineuart.start(1)
                    this.workingTimeout()
                }
                    
                
        },time)
}
    async readSettingsFromFile(){
        try{
            if(this.stage!=0){
                return 'останови циклы брат'
            }
            const data = await fs.readFile(this.config_path)
            const j_data = JSON.parse(data)
            this.cycle_count = j_data.cycle_count
            this.top_pressure = j_data.top_pressure
            this.bot_pressure = j_data.bot_pressure
            this.top_pause = j_data.top_pause
            this.bot_pause = j_data.bot_pause
            return 'настройки считаны'
        }catch(e){
            console.log(e)
            return 'ошибка сохранения настроек'
        }
    }
    async saveSettings(){
        try {
            const s_data = JSON.stringify({cycle_count:this.cycle_count,top_pressure:this.top_pressure,bot_pressure:this.bot_pressure,top_pause:this.top_pause,bot_pause:this.bot_pause})
            console.log(s_data)
            await fs.writeFile(this.config_path,s_data)
            return "настройки сохранены"
        } catch (error) {
            console.log(error)
            return "ошибка сохранения настроек"
        }
    }

    
}
 

const l = new LOOP()
//l.startLoop()
module.exports = l

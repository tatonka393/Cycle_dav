const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const kamazEngine = require('../utils/kamazEngine')

// const port = new SerialPort({
//     path: 'COM9',
//     baudRate: 115200,
//   })
   const { InterByteTimeoutParser } = require('@serialport/parser-inter-byte-timeout')
   const ieee754 = require('ieee754')

  class DM500{
    constructor(){
        this.preambule = [0xff,0xff,0xff]
        this.path = '/dev/ttyUSB0'
        this.baud_rate = 9600
        this.port
        this.parser
        this.pressure = 0
        this.err_count = 0
        this.err_state = false
        this.pressure_arr = []
        this.err_counter = 0
        this.wait_answer = false
        this.timer = new Date
    }

    addItemToArr(press){
        const date = new Date()
        if(this.pressure_arr > 18000)
            this.pressure_arr.unshift()
        this.pressure_arr.push({
            date,
            value:press
        })
        //console.log(this.pressure_arr)
    }

    async Create(){
        try{
            const port_list  = await SerialPort.list()
            for(let item of port_list){
                console.log(item.path)
                if(item.path == this.path){
                    this.port = new SerialPort({ path: this.path,baudRate: this.baud_rate})
                    this.parser = this.port.pipe(new InterByteTimeoutParser({ interval: 110}))
                    return "port is open"
                }
            }
            throw "monometr port is not found"
            
        }
        catch(e){
            console.log(e)
            throw "error"
        }

    }
    
    async checkPress(){
        try{
            const ans = await this.Write([0x82,0xFF,0xFF,0xFF,0xFF,0x00,0x01,0x00])
            
            const value = Ieee754toFloat(ans.slice(ans.length-4,ans.length))
            //console.log(value)
            this.err_count = 0
            this.err_state = false 
            return value
        }
        catch(e){
            this.err_count ++
            this.err_counter ++
            if(this.err_count >= 5)
                this.err_state = true 
            console.log(e,";errcounter - ",this.err_counter,";engine state- ",kamazEngine.getMoveState() )
        }
    }

    async startSurvey(){
        try {
            await mon.Create()
            setInterval(async ()=>{
                //console.log('start')
                //console.log("vopros")
                
                mon.pressure  = await mon.checkPress()
                //console.log('stop')
                //console.log(mon.pressure)
               
            },300)
        } catch (error) {
         console.log(error)   
        }
    }



    async Write(message){
        return new Promise((resolve, reject) => {
           // console.log("Write",message)
            const crc = CrcCount(message)        
            const full_package = [...this.preambule,...message,crc]
           // console.log(Buffer.from(full_package))
            this.port.write(Buffer.from(full_package))

            const wait_timeout = setTimeout(() => {
                this.parser.removeAllListeners()
                reject({error:"timeout is end"})
            }, 2000);
            this.parser.on('data', (data)=>{
                //console.log("otvet")
                    clearTimeout(wait_timeout)
                    this.parser.removeAllListeners()  //удаляем слушателя чтобы память не тратить
                    const msg = data.slice(3,data.length-1)
                    const recive_crc = CrcCount(msg)
                    if(recive_crc == data[data.length-1]){
                        const t = new Date() - this.timer
                        this.timer = new Date()
                        //console.log(t)
                        resolve(msg)
                    }
                    else
                        reject({error:'crc error',data})   

            })
        })  
    }
  }

  const CrcCount = function(data){
    //console.log("CrcCount",data)
    let arr = Array.from(data)
    //console.log(arr)
    let crc = data[0];
    arr.shift()
    for(let item of arr){
        crc = crc ^ item
    }
    return crc
  }
  //console.log(CrcCount([0x82,0xFF,0xFF,0xFF,0xFF,0x00,0x01,0x00]))

  const Ieee754toFloat = function(buff){
    const i = ieee754.read(Buffer.from(buff),0,0,23,4) // = function (buffer, offset, isLE, mLen, nBytes)
    return i
  }

  function FloatToHex(num){
    //console.log(num)
    const getHex = i => ('00' + i.toString(16)).slice(-2);
    
    var view = new DataView(new ArrayBuffer(4)),
        result;
    
    view.setFloat32(0, num);
    
    result = Array
        .apply(null, { length: 4 })
        .map((_, i) => getHex(view.getUint8(i)))
        .join('');
        //return [result.substring(0,2),result.substring(2,4),result.substring(4,6),result.substring(6,8)]
        return [parseInt(result.substring(0,2),16),parseInt(result.substring(2,4),16),parseInt(result.substring(4,6),16),parseInt(result.substring(6,8),16)]
    
    }



const mon = new DM500()

module.exports = mon
const { SerialPort } = require('serialport')
const port = new SerialPort({
    path: 'COM9',
    baudRate: 115200,
  })
  const { InterByteTimeoutParser } = require('@serialport/parser-inter-byte-timeout')
  const parser = port.pipe(new InterByteTimeoutParser({ interval: 30 }))
  
  port.open(function (err) {
    // if (err) {
    //   return console.log('Error opening port: ', err.message)
    // }
  
    // Because there's no callback to write, write errors will be emitted on the port:
   
  })

  function SendCommand(cmd,data){
    const ver = 0x02
    const cmd_type = 0x02
    const cmd_id  = 0x1a
    const data_length = [0x04,0x00]
    const cmd_data  = [(cmd&0x0f)<<4,((data&0x3f)<<2)|(cmd>>4),(data>>6)&0xff,data>>14]
    return Buffer.from([0xfa,ver,cmd_type,cmd_id,...data_length,...cmd_data ,0xfb])
}

  const GoForvard = function(speed){
      SendCommand(0x0e,speed)
  }

  const GoRevers = function(){
      SendCommand(0x0f,speed)
  }

  const Stop = function(){

  }
port.on('open', function() {
  console.log("fuck")
  port.write(Buffer.from([0xfa,0xee,0x01,0x00,0x49,0x08,0x00,0xef,0xcd,0xab,0x89,0x67,0x45,0x23,0x01,0xfb]))// open logic
})
setTimeout(function(){ 
  port.write(SendCommand(0X0e,100))// 100 вперед
},2000)

parser.on('data', console.log) // will emit data if there is a pause between packets of at least 30ms

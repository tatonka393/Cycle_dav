const speed_0 = [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];
const speed_1 = [0xAA,0xAA,0xAA,0xAA,0xAA,0xAA,0xAA]//,0xAA,0xAA,0xAA,0xAA];
const speed_2 = [0xCC,0xCC,0xCC,0xCC,0xCC,0xCC,0xCC]//,0xCC,0xCC,0xCC,0xCC];
const speed_3 = [0xFF,0x00,0xFF,0x00,0xFF,0x00,0xFF]//,0x00]//,0xFF,0x00,0xFF];

const { SerialPort } = require('serialport')

  const { InterByteTimeoutParser } = require('@serialport/parser-inter-byte-timeout')
  
  class UART_HANDLER{
    constructor(){
      this.interval
      this.path = '/dev/ttyS3'
      this.baud_rate = 600
      this.port
      this.parser
      this.status = 'off'
    }
    async Create(){
      try{
          const port_list  = await SerialPort.list()
          for(let item of port_list){
              if(item.path == this.path){
                  this.port = new SerialPort({ path: this.path,baudRate: this.baud_rate})
                  this.parser = this.port.pipe(new InterByteTimeoutParser({ interval: 30 }))
                  return "port is open"
              }
          }
          throw "port is not found"
          
      }
      catch(e){
          console.log(e)
          //throw "error"
      }

  }
    start(speed){
      this.status = 'on'
      let arr
      switch (speed) {
        case 1:
          arr = speed_1
          break;
        case 2:
          arr = speed_2
          break;
        case 3:
          arr = speed_3
          break;
      }
      this.interval = setInterval(()=>{
        this.port.write(Buffer.from(arr))
      },100)
    }
    stop(){
      this.status = 'off'
      clearInterval(this.interval)
    }
  }
  const uh = new UART_HANDLER()
  module.exports = uh
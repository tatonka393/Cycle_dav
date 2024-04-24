const gpio = require("@iiot2k/gpio");

gpio.init_gpio(26, gpio.GPIO_MODE_OUTPUT, 0);
gpio.init_gpio(20, gpio.GPIO_MODE_OUTPUT, 0);
gpio.init_gpio(5,gpio.GPIO_MODE_OUTPUT,1)
gpio.init_gpio(22,gpio.GPIO_MODE_INPUT_PULLDOWN,1000);
gpio.init_gpio(6,gpio.GPIO_MODE_INPUT_PULLDOWN,1000);
gpio.init_gpio(13,gpio.GPIO_MODE_INPUT_PULLDOWN,1000);
 setInterval(()=>{
     //console.log(gpio.get_gpio(22))
      // if(gpio.get_gpio(2)){
      //    gpio.set_gpio(26,0)
      //   gpio.set_gpio(20,0)
      // }
      //else
      //console.log(gpio.get_gpio(6),gpio.get_gpio(13))
     if(gpio.get_gpio(6)){
        gpio.set_gpio(26,0)
        gpio.set_gpio(20,1)
     }if(gpio.get_gpio(13)){
        gpio.set_gpio(26,1)
        gpio.set_gpio(20,0)
     }
     if(!gpio.get_gpio(13)&&!gpio.get_gpio(6)){
      gpio.set_gpio(26,0)
      gpio.set_gpio(20,0)
     }
 },30)


const gpio = require("@iiot2k/gpio");
gpio.init_gpio(26, gpio.GPIO_MODE_OUTPUT, 0);
gpio.init_gpio(20, gpio.GPIO_MODE_OUTPUT, 0);
gpio.init_gpio(5,gpio.GPIO_MODE_OUTPUT,1) //кнопка
//gpio.init_gpio(22,gpio.GPIO_MODE_INPUT_PULLDOWN,1000); 
gpio.init_gpio(6,gpio.GPIO_MODE_INPUT_PULLDOWN,1000); //кнопка
gpio.init_gpio(13,gpio.GPIO_MODE_INPUT_PULLDOWN,1000); //кнопка
class KamazEngine{
    #direction
    #onMove
    #moveState

    constructor(){
        console.log("kamaz engine")
        this.#onMove = false
        this.#direction = true;
        this.#moveState = false
        setInterval(()=>{
            if(!this.#onMove){
                if(gpio.get_gpio(6)){
                    gpio.set_gpio(26,0)
                    gpio.set_gpio(20,1)
                    this.#moveState = true
                }if(gpio.get_gpio(13)){
                    gpio.set_gpio(26,1)
                    gpio.set_gpio(20,0)
                    this.#moveState = true
                }
                if(!gpio.get_gpio(13)&&!gpio.get_gpio(6)){
                gpio.set_gpio(26,0)
                gpio.set_gpio(20,0)
                this.#moveState = false
                }
            }
        },30)
    }
    
    start(){
        if(!this.#direction){
            gpio.set_gpio(26,0)
            gpio.set_gpio(20,1) 
        }else{
            gpio.set_gpio(26,1)
            gpio.set_gpio(20,0)
        }
        this.#moveState = true
        this.#onMove = true
    }
    stop(){
        gpio.set_gpio(26,0)
        gpio.set_gpio(20,0)
        this.#onMove = false
        this.#moveState = false
    }
    /**
     * Изменяет направление в зависимости от указанного значения.
     * 
     * @param {string} direction - Направление ('up' или 'down').
     */
    changeDirection(direction){
        if(direction == 'up')
            this.#direction = true;
        if(direction == 'down')
            this.#direction = false;
    }
    getDirection(){
        return this.#direction?'up':'down';
    }
    getMoveState(){
        return this.#moveState?'moveing':'stoped';
    }

}

const kamazEngine = new KamazEngine();

module.exports  = kamazEngine;
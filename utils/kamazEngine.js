

class KamazEngine{
    #direction

    constructor(){
        this.#direction = true;
    }
    
    start(){

    }
    stop(){

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
            this.direction = false;
    }
    getDirection(){
        return this.#direction;
    }

}

const kamazEngine = new KamazEngine();

module.exports  = kamazEngine;
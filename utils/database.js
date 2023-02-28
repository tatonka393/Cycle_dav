const { Pool, Client } = require('pg')

class KVSMDB{
    constructor() {
        this.pool = new Pool({
            host: 'localhost',
            database: 'kvsm',
            user:'web1',
            port: 5432,
            max: 20,
            connectionTimeoutMillis: 2000,
            password:'12345'
          })
    }

    stepForvard(){
        this.pool.query(`INSERT INTO front_relay_outside (str) VALUES ('R0R0R1R0')`)
    }

    stepBack(){
        this.pool.query(`INSERT INTO front_relay_outside (str) VALUES ('R0R0R0R0')`)
    }
    engineOn(){
        this.pool.query(`INSERT INTO front_relay_inside (str) VALUES ('R1R1R0R1DC1DISP2')`)
    }
    engineOff(){
        this.pool.query(`INSERT INTO front_relay_inside (str) VALUES ('R1R1R0R0DC1DISP2')`)
    }




}

const k = new KVSMDB()
//k.stepForvard()

module.exports = k
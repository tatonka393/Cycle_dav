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
    insertPressure(table,data,sensor_names){
        let query_string
        if(!sensor_names){
            query_string = `INSERT INTO ${table} (press) VALUES (${data})`       
        }
        else{
            const table_names = makeTableNames(sensor_names)
            query_string = `INSERT INTO ${table} (press${table_names}) VALUES (${data},${sensor_names})`
        }
        this.pool.query(query_string,(err,res)=>{
            if(err){
                //console.log(err)
            }            
        })
    }
    

}

function makeTableNames(data){
    let names = data.split(',')
    let table_names = ''
    for (let i = 0 ; i<=names.length-1; i++){
        table_names += ",S"+(i+1)  
    }
    return table_names
}
const k = new KVSMDB()
//k.stepForvard()

module.exports = k
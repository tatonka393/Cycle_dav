async function sendCommand(cmd){
    const response = await fetch('/command'+cmd, {
        method: 'GET',
    });
    
    const result = await response.json();
    if(result.alert)
        alert(result.message)
    console.log(result.message)               
}
async function getPressureArr(){
    const response = await fetch('/pressure_arr', {
        method: 'GET',
    });
    
    const result = await response.json();
    console.log(result)
    addArrData(result)              
}

async function sendForm(e)
{
    let form=e.target;
    let url=form.action;
    let sensor_name=document.getElementById('SensorName').value
    let cycle_count=document.getElementById('FcycleCount').value;
    let bot_pressure=document.getElementById('FbotPres').value;
    let top_pressure=document.getElementById('FtopPres').value;
    let top_pause=document.getElementById('topPause').value;
    let bot_pause=document.getElementById('botPause').value;
    console.log(e);
    const response = await fetch(url,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({top_pressure,bot_pressure,cycle_count,top_pause,bot_pause,sensor_name})
    })
    const result = await response.json()
    alert(result.message)
}
getPressureArr();
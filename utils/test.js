// function xor_summ(data){
//     xor_temp = 0xff
//     for(let elem of data){
//         xor_temp += elem
//     }
//     return (xor_temp^0xff)&0xff
// }

// const arr = [0X02, 0X02, 0X6c ,0X04 ,0X00 ,0Xe0 ,0X90 ,0X01 ,0X00]
// const arr1 = [0X02, 0X02, 0X4d ,0X04 ,0X00 ,0Xf0 ,0X90 ,0X01 ,0X00]

// console.log(xor_summ(arr),xor_summ(arr1))
// console.log(xor_summ(arr).toString(2),xor_summ(arr1))
// console.log( SendCommand(0X0e,100))
// console.log( SendCommand(0X0f,100))
// console.log(arr)


// function SendCommand(cmd,data){
//     const ver = 0x02
//     const cmd_type = 0x02
//     const cmd_id  = 0x1a
//     const data_length = [0x04,0x00]
//     const cmd_data  = [(cmd&0x0f)<<4,((data&0x3f)<<2)|(cmd>>4),(data>>6)&0xff,data>>14]
//     return Buffer.from([0xfa,ver,cmd_type,cmd_id,...data_length,...cmd_data,0xfb])
// }
// // [0x02,0x02,0x6c,0x04,0x00,]

// // [0x00,0x19,0x00,]
// // [0x00,0x01,0x90,0x0e]


const jopa = setInterval(()=>console.log('1'),200)
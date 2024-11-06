const mongose=require('mongoose');

const connectdb=async ()=>{
    try{
        const conn=await mongose.connect('mongodb://127.0.0.1:27017/UserData', {});
    console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch(error){
        console.log(error);
        process.exit(1);
        
    }
    
}
module.exports=connectdb;
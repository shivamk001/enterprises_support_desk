const mongoose=require('mongoose')
console.log(process.env.DATABASE_PASSWORD)
//const DB = process.env.MONGO_URI.replace('<password>',process.env.DATABASE_PASSWORD);
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

    }
    catch(error){
        console.log(`ERROR: ${error}`.red.underline.bold);
        process.exit(1);
    }
}

module.exports=connectDB
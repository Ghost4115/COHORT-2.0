const mongoose=require('mongoose')

function connectDB(){
    mongoose.connect("mongodb+srv://manavuttekar2_db_user:dbmanav@cluster0.zwgqajm.mongodb.net/lec8")
    .then(()=>{
        console.log('Connected to MongoDB')
    }
    )

}
module.exports=connectDB
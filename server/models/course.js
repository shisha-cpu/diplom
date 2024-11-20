import mongoose from "mongoose";

const courseModel = new mongoose.Schema({
    title : {
        type : String , 
        require : true
    },
    text : {
        type : String , 
        require : true
    },
    img :{
        type : String
    },
    likes :{
        type : Number,
        default : 0
    },
    views : {
        type : Number,
        default : 0
    },
    price : {
        type : Number ,
        default : 0
    },
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}
,
{
    timestamps : true
})

export default mongoose.model('Course' , courseModel)
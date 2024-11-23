import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    skills: {
        type: [String]
    },
    balance: {
       balance : { 
        type: Number,
        default: 100
        },
        nweBalance :{
            type : Number,
            default : 0  
        },
        allHistoryBalance : {
            type : Number,
            default : 0  
        }
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: {}
    }],
    purchased :
    {type : Array 
        
    },
    fovourite: {
        type :Array
    },
  
}, {
    timestamps: true
});

export default mongoose.model("User", userModel);

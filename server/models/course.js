import mongoose from "mongoose";


const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    content: { type: String, required: true }, 
    img: { type: String, required: false } 
});


const courseModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    likes :{type : Number , require : true  , default : 0},
    views:{type : Number , require : true  , default : 0},
    price: { type: Number, required: true },
    img: { type: String, required: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modules: [moduleSchema], 
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Course", courseModel);

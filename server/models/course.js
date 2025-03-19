import mongoose from "mongoose";

// Схема для вопросов
const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    options: [{ type: String, required: false }], 
    correctAnswer: { type: String, required: false }, 
    type: { type: String, enum: ['multiple_choice', 'text'] } 
  },
  { _id: false }
);


const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, required: false },
    questions: [questionSchema],
    textQuestion : { type : String  }
  },
  { _id: false } 
);

const commentSchema = new mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  text : {
    type : String
  },
  
})
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    tags : {type : Array },
    views: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    img: { type: String, required: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modules: [moduleSchema], 
    finalTest: [questionSchema], 
    comments : [commentSchema],
    accept : {type : Boolean , default : false},

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);

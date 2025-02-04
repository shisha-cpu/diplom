import mongoose from "mongoose";

// Схема для вопросов
const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }], // Массив вариантов ответов
    correctAnswer: { type: String, required: true }, // Правильный ответ
  },
  { _id: false }
);

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, required: false },
    questions: [questionSchema],
  },
  { _id: false } // чтобы не создавался отдельный id для каждого модуля
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
    comments : [commentSchema]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);

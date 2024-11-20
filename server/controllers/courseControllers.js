import User from "../models/user.js";
import Course from "../models/course.js";

//Курсы 
export const addCourse = async (req, res) => {
    try {
        const { courseData, userId } = req.body;
        
 
        const newCourse = await Course.create({ ...courseData, author: userId });

        
        await User.findByIdAndUpdate(userId, { $push: { courses: newCourse._id } });

        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
export const getCourse = async (req , res )=>{
    try {
        const courses = await Course.find() 
        res.json(courses)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getCourseById = async (req , res )=>{
    try {
        const {id} = req.params
        const course = await Course.findById(id)
        if (!course ){
          return  res.status(404).send({message : 'Курс не найден'})
        }
        res.json(course)
    } catch (err) {
        res.status(500).send(err.message); 
    }
}

export const getUserCourses = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'Пользователь не найден' });
        }
        const userCourses = await Course.find({author : id})
        res.json(userCourses);
        console.log(userCourses);
        
    } catch (err) {
        res.status(500).send(err.message);
    }
};


export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send('ID не пришел');
        }

        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).send('Курс не найден');
        }

        await User.updateOne(
            { _id: course.author }, 
            { $pull: { courses: course._id } }
        );

        res.send('Курс успешно удален');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
import User from "../models/user.js";
import Course from "../models/course.js";
import { application } from "express";

//Курсы 
export const addCourse = async(req, res) => {
    try {
        const { courseData, userId } = req.body;

        const newCourse = await Course.create({
            ...courseData,
            author: userId
        });

        await User.findByIdAndUpdate(userId, { $push: { courses: newCourse._id } });

        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const userGetCourse = async(req, res) => {
    try {
        const { userId, courseId } = req.body;

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const course = await Course.findOne({ _id: courseId });
        if (!course) {
            return res.status(404).json({ message: 'Курс не найден' });
        }

        if (user.purchased.length > 0) {
            let isCoursePurchased = false;
            for (let i = 0; i < user.purchased.length; i++) {
                if (user.purchased[i]._id.equals(course._id) && userId !== course.author) {
                    isCoursePurchased = true;
                    break;
                }
            }

            if (!isCoursePurchased) {
                user.purchased.push(course);
            }
        } else {
            user.purchased.push(course);
        }

        await user.save();
        res.json(user.purchased);

    } catch (err) {
        res.status(500).send(err.message);
    }
};
export const getPurchased = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.json(user.purchased)
    } catch (err) {
        res.status(500).send(err.message);
    }
}
export const getCourse = async(req, res) => {
    try {
        const courses = await Course.find()
        res.json(courses.reverse())
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getCourseById = async(req, res) => {
    try {
        const { id } = req.params
        const course = await Course.findById(id)
        if (!course) {
            return res.status(404).send({ message: 'Курс не найден' })
        }
        res.json(course)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getFovourite = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        // Возвращаем только массив fovourite
        res.json(user.fovourite);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getUserCourses = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'Пользователь не найден' });
        }
        const userCourses = await Course.find({ author: id })
        res.json(userCourses);

    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const changeLikes = async(req, res) => {
    try {
        const { userId, courseId, action } = req.body 
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(404).json({ message: 'Пользователь не найден' })
        }
        const course = await Course.findOne({ _id: courseId });
        if (!course) {
            res.status(404).json({ message: 'Курс не найден ' })
        }
        switch (action) {
            case 'plus':
                if (userId.toString() === course.author.toString()) {
                    user.balance.nweBalance += 1
                    user.balance.allHistoryBalance++
                        console.log(userId, course.author);

                }
                course.likes += 1
                user.fovourite.push(courseId)
                break;
            case 'minus':
                if (user.balance.nweBalance > 0 && userId.toString() === course.author.toString()) {
                    user.balance.nweBalance -= 1
                    user.balance.allHistoryBalance--
                }
                course.likes -= 1
                user.fovourite = user.fovourite.filter(id => id.toString() !== courseId.toString());
                break;
        }
        await course.save()
        await user.save()

        res.json(course.likes)
    } catch (err) {
        res.status(500).send(err.message);
    }
}


export const addNewBalance = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id });
        if (!user) {
            res.status(404).json({ message: 'Пользователь не найден' })
        }

        res.json(user.balance.nweBalance)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const clwarNewBalance = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id });
        if (!user) {
            res.status(404).json({ message: 'Пользователь не найден' })
        }
        user.balance.nweBalance = 0
        await user.save()
        res.json(user.balance.nweBalance)
    } catch (err) {
        res.status(500).send(err.message);
    }
}
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!id) {
            return res.status(400).send('ID не пришел');
        }

        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).send('Курс не найден');
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        user.pushared = user.pushared.filter(item => item.toString() !== course._id.toString());
        await user.save();
        await User.updateOne({ _id: course.author }, { $pull: { courses: course._id } });

        return res.send('Курс успешно удален')
    } catch (err) {
        return res.status(500).send(err.message); 
    }
};


export const publicCourse = async(req ,res ) =>{
    const {id } = req.params
    try {
        const course = await Course.findById(id)
        course.accept = true
        await course.save()

        res.send('Удалено')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const AddView = async(req, res) => {
    try {
        const { id } = req.params
        const course = await Course.findOne({ _id: id })
        if (!course) {
            return res.status(404).json({ message: 'Курс не найден ' })
        }
        course.views++
            await course.save()

        res.json(course.views)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const addComment = async(req , res )=>{
    const {userId , text , courseId } = req.body
    try {
        if (!userId || !text || !courseId) {
            return res.status(400).json({ message: "Все поля обязательны" });
        }
        const course = await Course.findById(courseId)
        if (!course) {
         return   res.status(404).send({msg : 'Курс не найден'})
        }
        
        const newComment = {
            user :  userId , 
            text : text
        }
        console.log(newComment);
        
        await course.comments.push(newComment)
        await course.save()
        res.status(201).json({ message: "Комментарий добавлен", comment: newComment });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getComments = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId).populate("comments.user", "name"); 

        if (!course) {
            return res.status(404).json({ msg: "Курс не найден" });
        }

        res.status(200).json(course.comments);
    } catch (err) {
        res.status(500).json({ message: "Ошибка сервера", error: err.message });
    }
};


export const getAllBalance = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден ' })
        }
        res.json(user.balance.allHistoryBalance)
    } catch (err) {
        res.status(500).send(err.message);
    }
}
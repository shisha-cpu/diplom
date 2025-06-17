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

        // Проверяем, не куплен ли уже курс
        const isPurchased = user.purchased.some(p => p._id.equals(course._id));
        if (isPurchased) {
            return res.status(400).json({ message: 'Курс уже куплен' });
        }

        // Находим автора курса и переводим ему баллы в newBalance
        const courseAuthor = await User.findById(course.author);
        if (courseAuthor) {
            courseAuthor.balance.nweBalance += course.price;
            courseAuthor.balance.allHistoryBalance += course.price;
            await courseAuthor.save();
        }

        // Добавляем курс
        user.purchased.push(course);
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
        console.log(course);
        
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
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        const course = await Course.findOne({ _id: courseId });
        if (!course) {
            return res.status(404).json({ message: 'Курс не найден ' });
        }

        // Find course author to reward them for likes
        const courseAuthor = await User.findById(course.author);
        if (!courseAuthor) {
            return res.status(404).json({ message: 'Автор курса не найден' });
        }

        switch (action) {
            case 'plus':
                // Add reward to author's newBalance when someone likes their course
                if (userId.toString() !== course.author.toString()) {
                    courseAuthor.balance.nweBalance += 1;
                    courseAuthor.balance.allHistoryBalance += 1;
                }
                course.likes += 1;
                user.fovourite.push(courseId);
                break;
            case 'minus':
                // Remove reward from author's newBalance when someone unlikes their course
                if (userId.toString() !== course.author.toString() && courseAuthor.balance.nweBalance > 0) {
                    courseAuthor.balance.nweBalance -= 1;
                    courseAuthor.balance.allHistoryBalance -= 1;
                }
                course.likes -= 1;
                user.fovourite = user.fovourite.filter(id => id.toString() !== courseId.toString());
                break;
            default:
                return res.status(400).json({ message: 'Неверное действие' });
        }
        await course.save();
        await user.save();
        await courseAuthor.save();

        return res.json(course.likes);
    } catch (err) {
        return res.status(500).json({ message: err.message });
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
// controllers/controllers.js

export const getBalance = async (req, res) => {
  try {
    console.log(req.params.id);
    
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json({ balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении баланса' });
  }
};

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
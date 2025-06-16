import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // В реальном проекте используйте переменные окружения

// Авторизация
export const register = async (req, res) => {
    const { name, email, password, skills } = req.body;
    if (!email) {
        return res.status(400).json({ msg: 'Введите email' });
    }
    if (!password) {
        return res.status(400).json({ msg: 'Введите пароль' });
    }
    if (!name) {
        return res.status(400).json({ msg: 'Введите имя' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Пользователь с таким email уже существует' });
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPass = await bcrypt.hash(password, salt);

        const userData = new User({
            name,
            email,
            password: hashPass,
            skills
        });

        const user = await userData.save();
        
        // Создаем JWT токен
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({msg : 'Введите email'})
    }
    if (!password) {
        return res.status(400).json({msg : 'Введите пароль '})
    }

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({msg : 'Пользователь не найден '})
        }

        const isValidPass = await bcrypt.compare(password, user.password);
        
        if (isValidPass) {
            // Создаем JWT токен
            const token = jwt.sign(
                { userId: user._id },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.json({ user, token });
        } else {
            return res.status(400).json({msg : 'Данные не верные '})
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const users = async(req ,res ) =>{
    try {
        const users = await User.find()
        res.send(users)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteUser = async(req ,res ) =>{
    const {id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)

        res.send('Удалено')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


//Изменение баланса 

    export const changeBalance = async (req, res) => {
        try {
            const { action, id, sum } = req.body;

            const user = await User.findById(id);
            if (!user) {
                return res.sendStatus   (404).json('Пользователь не найден');
            }

            if (action === 'plus') {
                user.balance.balance += sum;
            } else if (action === 'minus') {
                user.balance.balance -= sum; 
            } else {
                return res.sendStatus(400).json('Такого действия нет');
            }

            await user.save(); 
            res.json(user.balance.balance)
        } catch (err) {
            res.sendStatus(500).json({ message: err.message });
        }
    };

export const updateUserSkills = async (req, res) => {
    const { id } = req.params;
    const { skills } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Пользователь не найден' });
        }

        user.skills = skills;
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


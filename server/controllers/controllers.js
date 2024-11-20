import User from "../models/user.js";
import bcrypt from 'bcrypt'

// Авторизация
export const register = async (req, res) => {
    const { name, email, password , skills } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPass = await bcrypt.hash(password, salt);

    try {
        const userData = new User({
            name,
            email,
            password: hashPass,
            skills
        });
        const user = await userData.save();
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).send('Введите email');
    }
    if (!password) {
        return res.status(400).send('Введите пароль');
    }

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).send('Пользователь не найден');
        }

        const isValidPass = await bcrypt.compare(password, user.password);
        
        if (isValidPass) {
            res.send(user);
        } else {
            return res.status(401).send('Пароль неверный');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



//Изменение баланса 

    export const changeBalance = async (req, res) => {
        try {
            const { action, id, sum } = req.body;

            const user = await User.findById(id);
            if (!user) {
                return res.sendStatus   (404).json('Пользователь не найден');
            }

            if (action === 'plus') {
                user.balance += sum;
            } else if (action === 'minus') {
                user.balance -= sum; 
            } else {
                return res.sendStatus(400).json('Такого действия нет');
            }

            await user.save(); 
            res.json(user.balance)
        } catch (err) {
            res.sendStatus(500).json({ message: err.message });
        }
    };

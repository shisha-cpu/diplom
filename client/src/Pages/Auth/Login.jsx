import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import './login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [err, setErr] = useState("");

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            tempErrors.email = "Email обязателен";
        } else if (!emailRegex.test(email)) {
            tempErrors.email = "Некорректный email";
        }

        if (!password) {
            tempErrors.password = "Пароль обязателен";
        } else if (password.length < 6) {
            tempErrors.password = "Пароль должен быть не менее 6 символов";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(""); // Сбрасываем ошибку при каждой попытке входа
        
        if (!validate()) return;

        const userData = { email, password };

        try {
            const res = await axios.post("http://localhost:4444/login", userData);
            
            // Сохраняем токен в localStorage
            localStorage.setItem("token", res.data.token);
            
            dispatch(fetchUser(res.data.user));
            localStorage.setItem("user", JSON.stringify(res.data.user));
            
            navigate("/");
            
            setTimeout(() => {
                window.location.reload();
            }, 100);
            
        } catch (err) {
            if (err.response) {
                setErr(err.response.data.msg || "Ошибка входа");
            } else {
                setErr("Произошла ошибка при подключении к серверу");
            }
        }
    };

    return (
        <section>
            <div className="auth-container">
                <h2 className="auth-logo">Вход</h2>
                {err && <div className="error-message global-error">{err}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? 'input-error' : ''}
                        />
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>

                    <input type="submit" value="Войти" />
                </form>
            </div>
        </section>
    );
}
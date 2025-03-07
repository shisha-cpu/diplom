import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/slices/userSlice";
import { Navigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const userData = { email, password };

        axios
            .post("http://89.169.39.144:4444/login", userData)
            .then((res) => {
                dispatch(fetchUser(res.data));
                setRedirect(true);
                localStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch((err) => setErr(err.response?.data?.msg || "Ошибка входа"));
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <section>
            <div className="auth-container">
                <h2 className="auth-logo">Вход</h2>
                {err && <p className="err">{err}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}

                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}

                    <input type="submit" value="Войти" disabled={Object.keys(errors).length > 0} />
                </form>
            </div>
        </section>
    );
}

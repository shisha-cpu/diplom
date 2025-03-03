import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './courseStat.css'
export default function CourseStat() {
    const { id } = useParams();
    const [course, setCourse] = useState();
    const [ctr, setCtr] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:4444/course/${id}`)
            .then(res => {
                setCourse(res.data);
            });
    }, [id]);

    useEffect(() => {
        if (course) {
            const calculatedCtr = (course.likes / course.views) * 100;
            setCtr(isNaN(calculatedCtr) ? 0 : calculatedCtr);
        }
    }, [course]);

    return (
        <div className="stat">
            {course ? (
                <>
                    <h2>Статистика курса: {course.title}</h2>
                    <p>Создан: {new Date(course.createdAt).toLocaleString('ru-RU')}</p>
                    <p>Последнее обновление: {new Date(course.updatedAt).toLocaleString('ru-RU')}</p>
                    <p>Просмотры: {course.views}</p>
                    <p>Лайки: {course.likes}</p>
                    <p>CTR: {ctr.toFixed(2)} %</p>
                </>
            ) : (
                <p>Загрузка данных...</p>
            )}
        </div>
    );
}
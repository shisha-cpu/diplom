import './modal.css'
function Modal({ course, onClose }) {
    if (!course) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h1>{course.title}</h1>
                <p>Цена: {course.price}</p>
                <p>Длительность: {course.duration}</p>
                Темы : {course.tags ? course.tags.map((tag , id)=>(
                    <>
                    {tag},
                    </>
                )) : ''}
                <p>Описание: {course.description}</p>
            </div>
        </div>
    );
}

export default Modal;

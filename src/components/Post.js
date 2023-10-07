import React, {useState} from "react";

function Cat({ cat, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCat, setEditedCat] = useState({ ...cat });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        fetch(`https://cataas.com/api/cats/${cat._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedCat),
        })
            .then((response) => response.json())
            .then((data) => {
                onEdit(data);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Ошибка при обновлении котика:', error);
            });

    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedCat({
            ...editedCat,
            [name]: value,
        });
    };

    return (
        <li key={cat._id}>
            <img src={`https://cataas.com/cat/${cat._id}`} alt={cat.title} />
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Заголовок"
                        value={editedCat.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Описание"
                        value={editedCat.description}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={handleCancelEdit}>Отмена</button>
                </div>
            ) : (
                <div>
                    <h3>{cat.title}</h3>
                    <p>{cat.description}</p>
                    <button onClick={handleEdit}>Редактировать</button>
                    <button onClick={() => onDelete(cat)}>Удалить</button>
                </div>
            )}
        </li>
    );
}
export default Cat;

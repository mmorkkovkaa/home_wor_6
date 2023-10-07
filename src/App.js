import React, { useState, useEffect } from 'react';
import Cat from './components/Post';
function App() {
    const [cats, setCats] = useState([]);
    const [newCat, setNewCat] = useState({ title: '', description: '' });

    useEffect(() => {
        fetch('https://cataas.com/api/cats?limit=10&skip=0')
            .then((response) => response.json())
            .then((data) => {
                setCats(data);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке котиков:', error);
            });
    }, []);

    const handleEditCat = (editedCat) => {
        const updatedCats = cats.map((cat) =>
            cat._id === editedCat._id ? editedCat : cat
        );
        setCats(updatedCats);
    };

    const handleDeleteCat = (cat) => {
        const updatedCats = cats.filter((c) => c._id !== cat._id);
        setCats(updatedCats);
    };

    const handleAddCat = () => {
        const newCatData = {
            ...newCat,
            _id: Date.now().toString(), // Временный ID
        };
        setCats([...cats, newCatData]);
        setNewCat({ title: '', description: '' });
    };

    const handleNewCatInputChange = (event) => {
        const { name, value } = event.target;
        setNewCat({
            ...newCat,
            [name]: value,
        });
    };

    return (
        <div>
            <h1>Cats API Приложение</h1>
            <div>
                <h2>Список котиков</h2>
                <ul>
                    {cats.map((cat) => (
                        <Cat
                            key={cat._id}
                            cat={cat}
                            onEdit={handleEditCat}
                            onDelete={handleDeleteCat}
                        />
                    ))}
                </ul>
            </div>
            <div>
                <h2>Добавить нового котика</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Заголовок"
                    value={newCat.title}
                    onChange={handleNewCatInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Описание"
                    value={newCat.description}
                    onChange={handleNewCatInputChange}
                />
                <button onClick={handleAddCat}>Добавить</button>
            </div>
        </div>
    );
}

export default App;
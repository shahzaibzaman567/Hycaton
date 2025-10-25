import React, { useState } from 'react';
function TodoApp() {
    const [todos, setTodos] = useState([
        { id: 1, text: "React practice", completed: false, isEditing: false },
        { id: 2, text: "Learn Redux", completed: false, isEditing: false }
    ]);
    const handleEditClick = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, isEditing: true };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };
    const handleKeyDown = (e, id) => {
        if (e.key === "Enter") {
            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, text: e.target.value, isEditing: false };
                }
                return todo;
            });
            setTodos(updatedTodos);
        }
    };
    return (
        <div>
            <h2>Todo List</h2>
            {todos.map(todo => (
                <div key={todo.id} style={{ marginBottom: '10px' }}>
                    {todo.isEditing ? (
                        <input
                            type="text"
                            defaultValue={todo.text}
                            onKeyDown={(e) => handleKeyDown(e, todo.id)}
                        />
                    ) : (
                        <span onClick={() => handleEditClick(todo.id)} style={{
                            cursor:'pointer'
                        }}>
                           {todo.id}
                            {todo.text}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
export default TodoApp;

import React, { useState, useEffect } from 'react';
import './../styles.css';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask) {
            if (editIndex !== null) {
                const newTasks = [...tasks];
                newTasks[editIndex] = newTask;
                setTasks(newTasks);
                setNewTask('');
                setEditIndex(null);
            } else {
                setTasks([...tasks, newTask]);
                setNewTask('');
            }
        }
    };

    const handleEdit = (index) => {
        setNewTask(tasks[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <div className="container">
            <h1 className="task-center_plus">Список задач</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="newTask" className="task-center_plus-1">Добавить новую задачу</label>
                    <div className="input-group">
                        <input
                            type="text"
                            id="newTask"
                            className="form-control"
                            placeholder="Enter task"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-primary">
                                {editIndex !== null ? 'Обновить' : 'Добавить'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <ul className="list-group">
                {tasks.map((task, index) => (
                    <li className="list-group-item" key={index}>
                        <div className="task-text task-center">
                            {task}
                        </div>
                        <div className="task-actions task-actions-container">
                            <button
                                type="button"
                                className="btn btn-sm editlink"
                                onClick={() => handleEdit(index)}
                            >
                                Редактировать
                            </button>
                            <button
                                type="button"
                                className="btn btn-delete removelink"
                                onClick={() => handleDelete(index)}
                            >
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;

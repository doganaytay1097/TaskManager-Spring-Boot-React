// src/components/TaskList.jsx
import React from 'react';
import { Checkbox } from '@mui/material';

const TaskList = ({ tasks, onTaskSelect, fetchTasks }) => {
    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`/v1/task/${taskId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Silme Hatası: ${response.status}`);
            }
            fetchTasks(); // Silme işleminden sonra listeyi güncelle
        } catch (error) {
            console.error("Görev silinemedi:", error);
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            const response = await fetch(`/v1/task/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });
            if (!response.ok) {
                throw new Error(`Güncelleme Hatası: ${response.status}`);
            }
            fetchTasks(); // Güncellemeden sonra listeyi yenile
        } catch (error) {
            console.error("Görev güncellenemedi:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Görev Listesi</h2>
            <ul style={styles.list}>
                {tasks.map(task => (
                    <li
                        key={task.id}
                        style={{
                            ...styles.listItem,
                            backgroundColor: task.completed ? '#d1ffd6' : '#f9f9f9',
                            textDecoration: task.completed ? 'line-through' : 'none',
                        }}
                    >
                        <Checkbox
                            checked={task.completed}
                            onChange={() => handleToggleComplete(task)}
                            color="primary"
                        />
                        <div style={styles.taskInfo}>
                            <strong style={styles.taskTitle}>{task.title}</strong>
                            <span style={styles.taskDescription}>{task.description}</span>
                        </div>
                        <div>
                            <button onClick={() => onTaskSelect(task)} style={styles.button}>Düzenle</button>
                            <button onClick={() => handleDelete(task.id)} style={styles.button}>Sil</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        width: '50%',
        padding: '10px',
        marginTop: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
        borderRadius: '4px',
    },
    taskInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        textAlign: 'center', // Başlık ve açıklamayı ortalamak için
    },
    taskTitle: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    taskDescription: {
        whiteSpace: 'pre-wrap', // Satır kaydırma için
        color: '#555',
    },
    button: {
        marginLeft: '10px',
        padding: '5px 10px',
        border: 'none',
        backgroundColor: '#6200ea',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default TaskList;

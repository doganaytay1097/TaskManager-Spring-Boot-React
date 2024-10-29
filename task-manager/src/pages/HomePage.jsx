import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const HomePage = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    // Görevleri backend'den almak için fetchTasks fonksiyonu
    const fetchTasks = async () => {
        try {
            const response = await fetch('/v1/task');
            if (!response.ok) {
                throw new Error(`Hata: ${response.status}`);
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Görevler alınırken hata oluştu:", error);
        }
    };

    useEffect(() => {
        fetchTasks();  // Sayfa yüklendiğinde görevleri getir
    }, []);

    const handleTaskSelect = (task) => {
        setSelectedTask(task);
    };

    const handleSave = () => {
        setSelectedTask(null);  // Form kaydedildikten sonra sıfırlanır
        fetchTasks();           // Görevler güncellendikten sonra listeyi yenile
    };

    const handleClear = () => {
        setSelectedTask(null);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Task Manager</h1>
            <TaskForm selectedTask={selectedTask} onSave={handleSave} onClear={handleClear} />
            <TaskList tasks={tasks} onTaskSelect={handleTaskSelect} fetchTasks={fetchTasks} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '20px',
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: '20px',
        color: '#333',
    },
};

export default HomePage;

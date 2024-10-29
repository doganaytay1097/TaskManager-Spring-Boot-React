import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const TaskForm = ({ selectedTask, onSave, onClear }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title);
            setDescription(selectedTask.description);
            setCompleted(selectedTask.completed);
        } else {
            setTitle('');
            setDescription('');
            setCompleted(false);
        }
    }, [selectedTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description, completed };

        try {
            const response = selectedTask
                ? await fetch(`/v1/task/${selectedTask.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData),
                })
                : await fetch('/v1/task', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData),
                });

            if (!response.ok) {
                throw new Error(`Görev Kaydedilemedi: ${response.status}`);
            }

            onSave();
            onClear();
        } catch (error) {
            console.error("Görev kaydedilemedi:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <TextField
                id="outlined-basic"
                label="Başlık"
                variant="outlined"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Başlık"
                required
                inputProps={{ maxLength: 50 }}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 1,
                    input: { color: '#000' },
                }}
            />
            <TextField
                id="outlined-basic"
                label="Açıklama"
                variant="outlined"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Açıklama"
                required
                multiline
                rows={3}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 1,
                    input: { color: '#000' },
                }}
            />
            <FormGroup
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 2,
                }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Tamamlandı"
                />
            </FormGroup>
            <button type="submit" style={styles.button}>{selectedTask ? 'Güncelle' : 'Ekle'}</button>
            {selectedTask && <button type="button" onClick={onClear} style={styles.button}>Temizle</button>}
        </form>
    );
};

const styles = {
    form: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    button: {
        padding: '10px',
        backgroundColor: '#6200ea',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default TaskForm;

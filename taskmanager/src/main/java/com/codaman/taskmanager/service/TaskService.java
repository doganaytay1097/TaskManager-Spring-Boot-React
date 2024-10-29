package com.codaman.taskmanager.service;

import com.codaman.taskmanager.dto.TaskDto;
import com.codaman.taskmanager.dto.TaskRequest;
import com.codaman.taskmanager.entity.Task;
import com.codaman.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDto> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
       return tasks.stream().map(TaskDto::new).collect(Collectors.toList());
    }

    public TaskDto getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
        return new TaskDto(task);
    }

    public TaskDto createTask(TaskRequest taskRequest) {
        Task task = new Task();
        taskChange(task, taskRequest);
        taskRepository.save(task);
        return new TaskDto(task);
    }

    public TaskDto updateTask(Long taskId, TaskRequest taskRequest) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
        taskChange(task, taskRequest);
        taskRepository.save(task);
        return new TaskDto(task);
    }

    private void taskChange(Task task,TaskRequest taskRequest) {
        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setCompleted(taskRequest.getCompleted());
    }


    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}

package com.codaman.taskmanager.dto;

import com.codaman.taskmanager.entity.Task;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDto {

    private Long id;

    private String title;

    private String description;

    private Boolean completed;

    public TaskDto(Task entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.description = entity.getDescription();
        this.completed = entity.getCompleted();
    }
}

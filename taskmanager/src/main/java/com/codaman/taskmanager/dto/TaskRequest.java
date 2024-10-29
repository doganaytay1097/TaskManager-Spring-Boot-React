package com.codaman.taskmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskRequest {

    private Long id;

    private String title;

    private String description;

    private Boolean completed;


}

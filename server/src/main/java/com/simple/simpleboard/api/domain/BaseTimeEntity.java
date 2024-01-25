package com.simple.simpleboard.api.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseTimeEntity {

    @Column(updatable = false)
    @CreatedDate
    private String createdAt;

    @LastModifiedDate
    private String lastModifiedAt;

    private String curDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"));

    @PrePersist
    public void onPrePersist(){
        this.createdAt = curDate;
        this.lastModifiedAt = this.createdAt;
    }

    @PreUpdate
    public void onPreUpdate(){
        this.lastModifiedAt = curDate;
    }
}

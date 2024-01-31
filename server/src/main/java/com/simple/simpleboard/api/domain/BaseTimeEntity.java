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

    @Column(updatable = false, name = "create_date")
    @CreatedDate
    private String createDate;

    @LastModifiedDate
    @Column(name = "update_date")
    private String updateDate;

    @PrePersist
    public void onPrePersist(){
        this.createDate = getCurDate();
        this.updateDate = this.createDate;
    }

    @PreUpdate
    public void onPreUpdate(){
        this.updateDate = getCurDate();
    }

    public String getCurDate(){
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"));
    }
}

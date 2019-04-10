package com.zemoso.concurrentcallingservermodule.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "call_details")
public class CallDetailsModel
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @Column(nullable = false)
    private int checked;

    @Column(nullable = false)
    private String contactName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column
    private String status;

    @Column(nullable = false)
    private String dueDate;

    @Column
    private String duration;

    @Column
    private String notes;

    @Column
    private LocalDateTime createdDate;

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public CallDetailsModel()
    {
    }

    public CallDetailsModel(Long id, User user, int checked, String contactName, String phoneNumber, String status, String dueDate)
    {
        this.id = id;
        this.user = user;
        this.checked = checked;
        this.contactName = contactName;
        this.phoneNumber = phoneNumber;
        this.status = status;
        this.dueDate = dueDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public int isChecked()
    {
        return checked;
    }

    public void setChecked(int checked)
    {
        this.checked = checked;
    }

    public String getContactName()
    {
        return contactName;
    }

    public void setContactName(String contactName)
    {
        this.contactName = contactName;
    }

    public String getPhoneNumber()
    {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber)
    {
        this.phoneNumber = phoneNumber;
    }

    public String getStatus()
    {
        return status;
    }

    public void setStatus(String status)
    {
        this.status = status;
    }

    public String getDueDate()
    {
        return dueDate;
    }

    public void setDueDate(String dueDate)
    {
        this.dueDate = dueDate;
    }
}

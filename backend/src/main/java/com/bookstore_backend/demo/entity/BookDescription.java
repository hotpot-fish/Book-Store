package com.bookstore_backend.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "bookdetail")
public class BookDescription {
    @Id
    private int id;

    private String description;

    public BookDescription(int id, String description) {
        this.id = id;
        this.description = description;
    }

    public String getdescription() {
        return description;
    }

    public void setdescription(String description) {
        this.description = description;
    }
}


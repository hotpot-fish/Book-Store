package com.bookstore_backend.demo.entity;

import lombok.Data;
import org.neo4j.ogm.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NodeEntity
@Data
public class Neo4jLabel {
    @Id
    @GeneratedValue
    private Long id;
    @Property(name = "tag")
    private String tag;

    @Relationship(type = "BOOK")
    public List<Integer> books;

    public Neo4jLabel(String tag){
        this.tag=tag;
    }
    public void addBook(Book book) {
        if (books == null) {
            books = new ArrayList<>();
        }
        books.add(book.getId());
    }

    public Long getId() {
        return id;
    }

    public String getLabel() {
        return tag;
    }

    public List<Integer> getBookids() {
        return books;
    }

}

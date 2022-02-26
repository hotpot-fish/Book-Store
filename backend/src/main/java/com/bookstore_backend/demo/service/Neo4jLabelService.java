package com.bookstore_backend.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Neo4jLabel;

import java.util.List;
import java.util.Set;

public interface Neo4jLabelService {
    List<Book> getBooksWithData();
    List<Book> getBooksWithNovel();
    List<Book> getBooksWithClassics();
    void saveOne(Neo4jLabel label);
    void deleteAll();
}

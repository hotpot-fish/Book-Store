package com.bookstore_backend.demo.dao;

import com.bookstore_backend.demo.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface BookDao {
    Book findBook(Integer id);
    List<Book> listBooks();
    List<Book> showAllBooks();
    int updateBook(Map<String, String> param);
    boolean manageAddBook(Map<Object, Object> param);
    boolean manageDeleteBook(Map<Object, Object> param);
    Page<Book> woc(Pageable p);
}

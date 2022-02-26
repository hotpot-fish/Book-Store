package com.bookstore_backend.demo.service;
import com.bookstore_backend.demo.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface BookService {
    Book findBookById(Integer id);
    List<Book> listBooks();
    List<Book> showAllBooks();
    int updateBook(Map<String, String> param);
    boolean manageAddBook(Map<Object, Object> param);
    boolean manageDeleteBook(Map<Object, Object> param);
    Page<Book> woc(Pageable p);
    List<Book> searchBook(String word);
}

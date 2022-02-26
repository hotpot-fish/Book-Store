package com.bookstore_backend.demo.controller;

import com.bookstore_backend.demo.service.BookService;
import org.apache.logging.log4j.ThreadContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import com.bookstore_backend.demo.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.alibaba.fastjson.JSONObject;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class BookController {
    @Autowired
    private BookService bookService;



    @RequestMapping("/listBooks")
    public Page<Book> listBooks(@RequestBody Map<String, String> param){
        List<Book> list = bookService.listBooks();
        for(Book book : list){
            System.out.println(book.getId() + ": " + book.getName());
        }
        String snowPage =  String.valueOf(param.get("page"));
        int nowPage = Integer.valueOf(snowPage);
        Pageable pageable = PageRequest.of(nowPage, 16);
        List<Book> b = bookService.woc(pageable).getContent();
        System.out.println("i.getName()");
        for(Book i : b){
            System.out.println(i.getName());
        }
        System.out.println();
        list = b;
        return bookService.woc(pageable);
    }

    @RequestMapping("/showAllBooks")
    public List<Book> showAllBooks(){
        List<Book> list = bookService.showAllBooks();
        for(Book book : list){
            System.out.println(book.getId() + "." + book.getName());
        }
        return list;
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id){
        return bookService.findBookById(id);
    }

    @RequestMapping("/updateBook")
    public int updateBook(@RequestBody Map<String, String> param){
        return bookService.updateBook(param);
    }

    @RequestMapping("/manageAddBook")
    public boolean manageAddBook(@RequestBody Map<Object, Object> param){
        boolean flag =  bookService.manageAddBook(param);
        if(flag == true){
            return true;
        }
        System.out.println("book_id重复");
        return false;
    }

    @RequestMapping("/manageDeleteBook")
    public boolean manageDeleteBook(@RequestBody Map<Object, Object> param){
        boolean flag =  bookService.manageDeleteBook(param);
        if(flag == true){
            return true;
        }
        System.out.println("删除");
        return false;
    }

    @RequestMapping("/searchBooks")
    public List<Book> searchBooks(@RequestBody JSONObject param){
        String word=param.getString("word");
        return bookService.searchBook(word);
    }
}

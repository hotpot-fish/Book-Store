package com.bookstore_backend.demo.serviceimpl;

import com.bookstore_backend.demo.dao.BookDao;
import com.bookstore_backend.demo.dao.LuceneDao;
import com.bookstore_backend.demo.search.BookSearch;
import com.bookstore_backend.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import com.bookstore_backend.demo.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Autowired
    LuceneDao luceneDao;

    @Override
    public Book findBookById(Integer id){
        return bookDao.findBook(id);
    }

    @Override
    public List<Book> listBooks() {
        return bookDao.listBooks();
    }

    @Override
    public List<Book> showAllBooks() {
        return bookDao.showAllBooks();
    }

    @Override
    public int updateBook(Map<String, String> param){
        return bookDao.updateBook(param);
    }

    @Override
    public boolean manageAddBook(Map<Object, Object> param){
        return bookDao.manageAddBook(param);
    }

    @Override
    public boolean manageDeleteBook(Map<Object, Object> param){
        boolean flag = bookDao.manageDeleteBook(param);
        if(flag == true){
            return true;
        }
        return false;
    }

    @Override
    public Page<Book> woc(Pageable p){
        return bookDao.woc(p);
    }

    @Override
    public List<Book> searchBook(String word){
        List<Book> bookList=new ArrayList<>();
        List<BookSearch> bookSearches=luceneDao.getBookByWord(word);
        for(BookSearch it:bookSearches){
            bookList.add(this.findBookById(it.getId()));
        }
        return bookList;
    }
}

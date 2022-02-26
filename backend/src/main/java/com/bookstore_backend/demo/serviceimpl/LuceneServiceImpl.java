package com.bookstore_backend.demo.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.dao.BookDao;
import com.bookstore_backend.demo.dao.LuceneDao;
import com.bookstore_backend.demo.search.BookSearch;
import com.bookstore_backend.demo.service.LuceneService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Service
public class LuceneServiceImpl implements LuceneService {

    @Autowired
    BookDao bookDao;

    @Autowired
    LuceneDao luceneDao;
    @Override
    public void synProductCreatIndex(){
        // 获取所有的book
        List<Book> bookList=bookDao.listBooks();
        List<BookSearch> bookSearches=new ArrayList<>();
        for(Book it:bookList){
            bookSearches.add(new BookSearch(it));
        }
        // 再插入productList
        luceneDao.createBookIndex(bookSearches);
    }
}

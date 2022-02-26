package com.bookstore_backend.demo.webservice;

import com.bookstore_backend.demo.dao.BookDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.service.BookService;

import javax.jws.WebParam;
import javax.jws.WebService;
import java.util.List;

@Component
@WebService(name="SearchService", targetNamespace = "http://server.webservice.search",
            endpointInterface = "com.bookstore_backend.demo.webservice.WebserviceApi")
public class WebserviceApiImpl implements WebserviceApi{
    @Autowired
    private BookService bookService;
    @Override
    public List<Book> searchBook(@WebParam String data){
        return bookService.searchBook(data);
    }
}

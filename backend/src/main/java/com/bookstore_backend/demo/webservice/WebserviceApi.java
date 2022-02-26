package com.bookstore_backend.demo.webservice;

import org.springframework.beans.factory.annotation.Autowired;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.service.BookService;

import java.util.List;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

@WebService( name="SearchService", targetNamespace = "http://server.webservice.search")
public interface WebserviceApi {
    @WebMethod
    List<Book> searchBook(@WebParam String data);
}

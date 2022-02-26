package com.bookstore_backend.demo.serviceimpl;


import com.bookstore_backend.demo.dao.Neo4jLabelDao;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Neo4jLabel;
import com.bookstore_backend.demo.service.Neo4jLabelService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class Neo4jLabelServiceImpl implements Neo4jLabelService {
    @Autowired
    private Neo4jLabelDao neo4jlabelDao;
    public List<Book> getBooksWithData(){
        return neo4jlabelDao.getBooksWithData();
    }
    public List<Book> getBooksWithNovel(){
        return neo4jlabelDao.getBooksWithNovel();
    }
    public List<Book> getBooksWithClassics(){
        return neo4jlabelDao.getBooksWithClassics();
    }
    public void saveOne(Neo4jLabel label){
        neo4jlabelDao.saveOne(label);
    }
    public void deleteAll(){
        neo4jlabelDao.deleteAll();
    }
}

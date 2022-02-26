package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.BookDao;
import com.bookstore_backend.demo.dao.Neo4jLabelDao;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Neo4jLabel;
import com.bookstore_backend.demo.repository.Neo4jLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Repository
public class Neo4jLabelDaoImpl implements Neo4jLabelDao {
    @Autowired
    private Neo4jLabelRepository neo4jLabelDaoRepository;
    @Autowired
    private BookDao bookDao;
    public List<Book> getBooksWithData(){
        List<Book> answer=new LinkedList<>();;
        List<Integer> num = neo4jLabelDaoRepository.findByTag("资料").getBookids();
        for (int i = 0; i < num.size(); i++) {
            Integer ans = num.get(i);
            answer.add(bookDao.findBook(ans));
        }
        return answer;
    }
    public List<Book> getBooksWithNovel(){
        List<Book> answer=new LinkedList<>();;
        List<Integer> num = neo4jLabelDaoRepository.findByTag("小说").getBookids();
        for (int i = 0; i < num.size(); i++) {
            Integer ans = num.get(i);
            answer.add(bookDao.findBook(ans));
        }
        return answer;
    }
    public List<Book> getBooksWithClassics(){
        List<Book> answer=new LinkedList<>();;
        List<Integer> num = neo4jLabelDaoRepository.findByTag("名著").getBookids();
        for (int i = 0; i < num.size(); i++) {
            Integer ans = num.get(i);
            answer.add(bookDao.findBook(ans));
        }
        return answer;
    }
    public void saveOne(Neo4jLabel tag){
        neo4jLabelDaoRepository.save(tag);
    }
    public void deleteAll(){
        neo4jLabelDaoRepository.deleteAll();
    }
}

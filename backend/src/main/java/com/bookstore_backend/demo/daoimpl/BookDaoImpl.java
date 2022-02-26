package com.bookstore_backend.demo.daoimpl;

import javax.annotation.PostConstruct;
import com.alibaba.fastjson.JSONArray;
import com.bookstore_backend.demo.dao.BookDao;
import com.bookstore_backend.demo.dao.LuceneDao;
import com.bookstore_backend.demo.entity.BookDescription;
import com.bookstore_backend.demo.repository.BookDescriptionRepository;
import com.bookstore_backend.demo.repository.BookRepository;
import com.bookstore_backend.demo.search.BookSearch;
import com.bookstore_backend.demo.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import com.bookstore_backend.demo.entity.Book;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    BookRepository bookRepository;

    @Autowired
    BookDescriptionRepository bookDescriptionRepository;
    @Autowired
    RedisUtil redisUtil;

    @Autowired
    LuceneDao luceneDao;

    @Override
    public Book findBook(Integer id){
        Book bookResult = null ;
        Object p = redisUtil.get("book" + id);

        if (p == null) {
            bookResult = bookRepository.findBook(id);
            redisUtil.set("book" + id, JSONArray.toJSON(bookResult));
        } else {
            bookResult = JSONArray.parseObject(p.toString(), Book.class);
        }

        Optional<BookDescription> des = bookDescriptionRepository.findById(id);
        if (des.isPresent()){
            System.out.println("Not Null " + id);
            bookResult.setDescription(des.get().getdescription());
        }
        else{
            bookResult.setDescription("");
            System.out.println("It's Null");
        }
        return bookResult;
    }

    @Override
    public List<Book> showAllBooks() {
        List<Book> listResult = bookRepository.showAllBooks();
        return listResult;
    }

    @Override
    public List<Book> listBooks() {
        List<Book> listResult = bookRepository.getBooks();

        return listResult;
    }


    @Override
    public int updateBook(Map<String, String> param){
        String sid = String.valueOf(param.get("id"));
        int id = Integer.valueOf(sid);
        int result = 0;
        String change = String.valueOf(param.get("change"));
        try {
            if (change.equals("id")) {
                String author = String.valueOf(param.get("author"));
                String name = String.valueOf(param.get("name"));
                result = bookRepository.updateBookID(id, author, name);
            }

            if (change.equals("author")) {
                String author = String.valueOf(param.get("author"));
                result = bookRepository.updateBookAuthor(id, author);
            }

            if (change.equals("type")) {
                String type = String.valueOf(param.get("type"));
                result = bookRepository.updateBookType(id, type);
            }

            if (change.equals("inventory")) {
                String sinventory = String.valueOf(param.get("inventory"));
                int inventory = Integer.valueOf(sinventory);
                bookRepository.updateBookInventory(id, inventory);
            }

            if (change.equals("price")) {
                String sprice = String.valueOf(param.get("price"));
                int price = Integer.valueOf(sprice);
                result = bookRepository.updateBookPrice(id, price);
            }

            if (change.equals("name")) {
                String name = String.valueOf(param.get("name"));
                result = bookRepository.updateBookName(id, name);
            }

            if (change.equals("ISBN")) {
                String SISBN = String.valueOf(param.get("ISBN"));
                int ISBN = Integer.parseInt(SISBN);
                result = bookRepository.updateBookISBN(id, ISBN);
            }

            if (change.equals("img")) {
                String img = String.valueOf(param.get("img"));
                result = bookRepository.updateBookImg(id, img);
            }

            if (change.equals("description")) {
                String description = String.valueOf(param.get("description"));
                luceneDao.updateBookIndex(id, description);
            }

            if (change.equals("status")) {
                String sstatus = String.valueOf(param.get("status"));
                int status = Integer.valueOf(sstatus);
                result = bookRepository.updateBookStatus(id, status);
            }
        }
        catch (Exception e){
            System.out.println("wrong input");
            return -1;
        }

        return result;
    }

    @Override
    public boolean manageAddBook(Map<Object, Object> param){
        try {
            System.out.println(param);
            String sid =  String.valueOf(param.get("id"));
            int book_id = Integer.valueOf(sid);
            System.out.println(book_id);
            String author = String.valueOf(param.get("author"));
            String type = String.valueOf(param.get("type"));
            String sinventory = String.valueOf(param.get("inventory"));
            int inventory = Integer.valueOf(sinventory);
            String sprice = String.valueOf(param.get("price"));
            int price = Integer.valueOf(sprice);
            String name = String.valueOf(param.get("name"));
            String img = String.valueOf(param.get("img"));
            String description = String.valueOf(param.get("description"));
            String sstatus = String.valueOf(param.get("status"));
            int status = Integer.valueOf(sstatus);

            Book book = bookRepository.findBook(book_id);
            if(book == null){
                System.out.println(book_id);
                System.out.println("null");
                Book newBook = new Book();
                newBook.setAuthor(author);
                newBook.setDescription(description);
                newBook.setImg(img);
                newBook.set(inventory);
                newBook.setName(name);
                newBook.setPrice(price);
                newBook.setStatus(status);
                newBook.setType(type);
                newBook.setID(book_id);
                System.out.println(book_id);

                bookRepository.save(newBook);
                bookRepository.updateBookID(book_id, author, name);
                return true;
            }
            else{
                return false;
            }
        }
        catch(Exception e){
            System.out.println("添加失败！");

            return false;
        }
    }

    @Override
    public boolean manageDeleteBook(Map<Object, Object> param){
        try {
            System.out.println(param);
            String sid =  String.valueOf(param.get("id"));
            int book_id = Integer.valueOf(sid);
            System.out.println(book_id);

            bookRepository.manageBookDelete(book_id);
            luceneDao.deleteBookIndex(book_id);
            return true;
        }
        catch(Exception e){
            System.out.println("添加失败！");

            return false;
        }
    }

    @Override
    public Page<Book> woc(Pageable p){
        Page<Book> list2= bookRepository.findAll(p);
        return list2;
    }
}

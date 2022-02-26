package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;
public interface BookRepository extends JpaRepository<Book,Integer> {
    @Query("from Book where id = :id")
    Book findBook(Integer id);

    @Query("select b from Book b where b.status = 1")
    List<Book> getBooks();

    List<Book> getBooksByStatusEquals(Integer status);

    @Query("select b from Book b")
    List<Book> showAllBooks();

    @Modifying
    @Transactional
    @Query(value = "update Book set author = :author where id = :id")
    int updateBookAuthor(int id, String author);

    @Modifying
    @Transactional
    @Query(value = "update Book set type = :type where id = :id")
    int updateBookType(int id, String type);

    @Modifying
    @Transactional
    @Query(value = "update Book set inventory = :inventory where id = :id")
    int updateBookInventory(int id, int inventory);

    @Modifying
    @Transactional
    @Query(value = "update Book set price = :price where id = :id")
    int updateBookPrice(int id, int price);

    @Modifying
    @Transactional
    @Query(value = "update Book set name = :name where id = :id")
    int updateBookName(int id, String name);

    @Modifying
    @Transactional
    @Query(value = "update Book set isbn = :ISBN where id = :id")
    int updateBookISBN(int id, int ISBN);

    @Modifying
    @Transactional
    @Query(value = "update Book set img = :img where id = :id")
    int updateBookImg(int id, String img);

    @Modifying
    @Transactional
    @Query(value = "update Book set description = :description where id = :id")
    int updateBookDescription(int id, String description);

    @Modifying
    @Transactional
    @Query(value = "update Book set status = :status where id = :id")
    int updateBookStatus(int id, int status);

    @Modifying
    @Transactional
    @Query(value = "update Book set id = :id where author = :author and name = :name")
    int updateBookID(int id, String author, String name);

    @Modifying
    @Transactional
    @Query(value = "delete from Book where id = :id")
    void manageBookDelete(int id);
}

package  com.bookstore_backend.demo.search;

import lombok.Data;
import com.bookstore_backend.demo.entity.Book;

@Data
public class BookSearch {
    private int id;

    private String description;

    public BookSearch(){}

    public BookSearch(Book book){
        this.id=book.getId();
        this.description=book.getDescription();
    }
}

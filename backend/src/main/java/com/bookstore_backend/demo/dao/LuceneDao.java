package com.bookstore_backend.demo.dao;

import com.bookstore_backend.demo.search.BookSearch;
import java.util.List;
public interface LuceneDao {
    void createBookIndex(List<BookSearch> bookSearches);
    List<BookSearch> getBookByWord(String word);
    void deleteBookIndex(Integer bookId);
    void updateBookIndex(Integer bookId,String des);
}

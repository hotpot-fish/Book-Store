package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem,Integer>  {
    @Query(value = "from CartItem where cart_id = :cart_id")
    List<CartItem> getCartItemByCart_id(int cart_id);

    @Query(value = "from CartItem where cart_id = :cart_id and book_id = :book_id")
    CartItem checkExists(int cart_id, int book_id);

    @Modifying
    @Transactional
    @Query(value = "delete from CartItem where cart_id = :cart_id and book_id = :book_id")
    void deleteCartItemByCart_idAndBook_id(int cart_id, int book_id);
}

package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query(value = "from Cart where user_id = :user_id")
    Cart getCartByUser_id(int user_id);
}

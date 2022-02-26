package com.bookstore_backend.demo.service;

import com.bookstore_backend.demo.entity.CartItem;

import java.util.List;
import java.util.Map;

public interface CartService {
    List<CartItem> listItems(int user_id);
    boolean addItem(Map<Object, Object> param);
    boolean deleteItem(Map<Object, Object> param);
    boolean createCart(Map<Object, Object> param);
}

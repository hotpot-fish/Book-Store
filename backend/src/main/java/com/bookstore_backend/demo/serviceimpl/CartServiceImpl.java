package com.bookstore_backend.demo.serviceimpl;

import com.bookstore_backend.demo.dao.CartDao;
import com.bookstore_backend.demo.entity.CartItem;
import com.bookstore_backend.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartDao cartDao;

    @Override
    public List<CartItem> listItems(int user_id){
        return cartDao.listItems(user_id);
    }

    @Override
    public boolean addItem(Map<Object, Object> param){
        boolean flag = cartDao.addItem(param);
        if(flag == true){
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteItem(Map<Object, Object> param){
        boolean flag = cartDao.deleteItem(param);
        if(flag == true){
            return true;
        }
        return false;
    }

    @Override
    public boolean createCart(Map<Object, Object> param){
        return cartDao.createCart(param);
    }
}

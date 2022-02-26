package com.bookstore_backend.demo.controller;

import com.bookstore_backend.demo.entity.CartItem;
import com.bookstore_backend.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class CartController {
    @Autowired
    private CartService cartService;

    @RequestMapping("/listItems")
    public List<CartItem> listItems(@RequestBody Map<Object, Object> param){
        String sid = String.valueOf(param.get("user_id"));
        System.out.println("user_id  " + sid);
        int user_id = Integer.valueOf(sid);
        System.out.println("list all!");
        List<CartItem> list = cartService.listItems(user_id);
        for(CartItem item : list){
            System.out.println(item.getName() + ": " + item.getPrice());
        }
        return list;
    }

    @RequestMapping("/addItem")
        public boolean addItem(@RequestBody Map<Object, Object> param){

        boolean flag =  cartService.addItem(param);
        if(flag == true){
            return true;
        }
        System.out.println("已添加过！");
        return false;
    }

    @RequestMapping("/deleteItem")
    public boolean deleteItem(@RequestBody Map<Object, Object> param){
        System.out.println("dele");
        boolean flag =  cartService.deleteItem(param);
        if(flag == true){
            return true;
        }
        System.out.println("本次删除失败");
        return false;
    }

    @RequestMapping("/createCart")
    public boolean createCart(@RequestBody Map<Object, Object> param){
        return cartService.createCart(param);
    }
}

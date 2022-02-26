package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.CartDao;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Cart;
import com.bookstore_backend.demo.entity.CartItem;
import com.bookstore_backend.demo.repository.BookRepository;
import com.bookstore_backend.demo.repository.CartItemRepository;
import com.bookstore_backend.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CartDaoImpl implements CartDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    BookRepository bookRepository;

    @Override
    public List<CartItem> listItems(int user_id){
        Cart userCart = cartRepository.getCartByUser_id(user_id);
        System.out.println("user_id"+user_id);
        if(userCart == null){
            System.out.println("null");
        }
        int cart_id = userCart.getCart_id();
        List<CartItem> listResult = cartItemRepository.getCartItemByCart_id(cart_id);
        for(CartItem item : listResult){
            Book book = bookRepository.findBook(item.getBook_id());
            item.setName(book.getName());
            item.setPrice(book.getPrice());
            item.setImg(book.getImg());
            item.setDescription(book.getDescription());
            item.setStatus(book.getStatus());
        }

        return listResult;
    }

    @Override
    public boolean addItem(Map<Object, Object> param){
        try {
            String sid =  String.valueOf(param.get("id"));
            int book_id = Integer.valueOf(sid);
            String suser_id =  String.valueOf(param.get("user_id"));
            int user_id = Integer.valueOf(suser_id);

            Cart userCart = cartRepository.getCartByUser_id(user_id);
            if(userCart == null){
                System.out.println("null");
                userCart = new Cart();
                userCart.setUser_id(user_id);
                cartRepository.save(userCart);
            }

            int cart_id = userCart.getCart_id();
            if(cartItemRepository.checkExists(cart_id, book_id) == null) {
                CartItem newCartItem = new CartItem();
                newCartItem.setBook_id(book_id);
                newCartItem.setCart_id(cart_id);
                cartItemRepository.save(newCartItem);
            }
            else{
                System.out.println("不可重复添加！");

                return false;
            }

            return true;
        }
        catch(Exception e){
            System.out.println("添加失败！");

            return false;
        }
    }

    @Override
    public boolean deleteItem(Map<Object, Object> param){
        try {
            String uid =  String.valueOf(param.get("user_id"));
            int user_id = Integer.valueOf(uid);

            String sid =  String.valueOf(param.get("id"));
            System.out.println(sid + "  " + sid.length());
            int length = 0;
            for(int i = 0; i < sid.length(); i++){
                if(sid.charAt(i) == ','){
                    length++;
                }
            }
            int[] id = new int[length + 1];
            int lastIndex = 0;

            Cart userCart = cartRepository.getCartByUser_id(user_id);
            int cart_id = userCart.getCart_id();
            System.out.println("user_id   "+user_id);
            System.out.println("cart_id   "+cart_id);
            System.out.println(sid);
            for(int j = 0; j < id.length; j++) {
                id[j] = 0;
                for (int i = lastIndex; i < sid.length(); i++) {
                    if (sid.charAt(i) == '[') {
                        continue;
                    }
                    if (sid.charAt(i) <= '9' && sid.charAt(i) >= '0') {
                        id[j] = id[j] * 10 + (sid.charAt(i) - '0');
                    }
                    if (sid.charAt(i) == ',' || sid.charAt(i) == ']') {
                        lastIndex = i + 1;
                        break;
                    }
                }
                System.out.println(id[j]);

                cartItemRepository.deleteCartItemByCart_idAndBook_id(cart_id, id[j]);
            }

            return true;
        }
        catch(Exception e){
            System.out.println("删除失败！");
            return false;
        }
    }

    @Override
    public boolean createCart(Map<Object, Object> param){
        String uid = String.valueOf(param.get("user_id"));
        System.out.println(uid);
        int user_id = Integer.valueOf(uid);
        Cart cart = new Cart();
        cart.setUser_id(user_id);
        cartRepository.save(cart);

        return true;
    }
}


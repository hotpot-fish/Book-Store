package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.UserDao;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.User;
import com.bookstore_backend.demo.repository.OrderRepository;
import com.bookstore_backend.demo.repository.UserRepository;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderRepository orderRepository;

    @Override
    public User check(String username, String password){
        try {
            User userResult = userRepository.checkUser(username, password);
            System.out.println("登陆成功!");

            return userResult;
        }
        catch (Exception e) {
            System.out.println("登陆失败!");

            return null;
        }
    }

    @Override
    public int register(@RequestBody Map<String,String> param){
        try {
            String username = param.get("username");
            String password = param.get("password");
            String password2 = param.get("password2");
            String email = param.get("email");
            System.out.println("username " + username + " , password " + password);
            System.out.println("password2 " + password2 + " , email " + email);
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setUserType(1);
            user.setEmail(email);
            userRepository.save(user);
            int user_id = userRepository.getUserIdbyUsername(username);
            return user_id;
        }
        catch (Exception e){
            return -1;
        }
    }

    @Override
    public List<User> listUsers(){
        List<User> listResult = userRepository.listUsers();

        return listResult;
    }

    @Override
    public int updateUserType(Map<String, String> param) {
        System.out.println("modify user type");
        String sid = String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(sid);
        System.out.println("user_id  "+ user_id);
        String stype = String.valueOf(param.get("user_type"));
        int user_type = Integer.valueOf(stype);
        System.out.println("user_type  "+ user_type);

        return userRepository.updateUserType(user_id, user_type);
    }

    @Override
    public int checkUserType(Map<String, String> param) {
        System.out.println("modify user type");
        String sid = String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(sid);
        System.out.println("user_id  "+ user_id);

        return userRepository.checkUserType(user_id);
    }

    @Override
    public List<User> getTopUser(Map<String, String> param){
        String minDate =  String.valueOf(param.get("minDate"));
        String maxDate =  String.valueOf(param.get("maxDate"));
        System.out.println(minDate + "  " + maxDate);
        List<List<Integer>> l = orderRepository.getOrdersByTime(minDate, maxDate);

        List<User> result = new LinkedList<>();
        for(List<Integer> i : l){
            System.out.println(i);
            User u = new User();
            int user_id = i.get(0);
            u.setUser_id(user_id);
            u.setTotalMoney(i.get(1));
            u.setUsername(userRepository.getUserByUserId(user_id).getUsername());
            result.add(u);
            System.out.println(u.getUser_id() +" "+ u.getTotalMoney() + " " + u.getUsername());
        }

        List<User> allUsers = userRepository.listUsers();
        int length = result.size();
        for(User user : allUsers){
            int user_id = user.getUser_id();
            boolean flag = false;
            int i = 0;
            for(i = 0; i < length; i++){
                if(result.get(i).getUser_id() == user_id){
                    flag = true;
                    break;
                }
            }
            if(flag == false && user.getUserType() != 0){
                user.setTotalMoney(0);
                result.add(user);
            }
        }

        return result;
    }

    @Override
    public boolean findNameDup(Map<String,String> param){
        String username =  String.valueOf(param.get("username"));
        User result = userRepository.findNameDup(username);
        if(result == null){
            return false;
        }
        return true;
    }
}

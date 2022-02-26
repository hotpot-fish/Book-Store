package com.bookstore_backend.demo.service;

import com.bookstore_backend.demo.entity.User;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface UserService {
    User check(String username, String password);
    List<User>listUsers();
    int updateUserType(Map<String, String> param);
    int checkUserType(Map<String, String> param);
    List<User> getTopUser(Map<String, String> param);
    int register(Map<String,String> param);
    boolean findNameDup(Map<String,String> param);
}

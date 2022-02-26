package com.bookstore_backend.demo.controller;

import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.User;
import com.bookstore_backend.demo.service.UserService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class UserController {
    @Autowired(required = false)
    private UserService userService;

    private boolean isSuccess = false;

    @RequestMapping(value="/login")
    public Map<String,String> check(@RequestBody Map<String,String> param){
        String username = param.get("username");
        String password = param.get("password");
        System.out.println("Controller " + "username " + username + " , password " + password);
        User user = userService.check(username, password);
        JSONObject json = new JSONObject();
        if(user == null){
            System.out.println("用户登录失败！");
            json.put("user_id", "-1");
            json.put("user_type", "-2");

            return null;
        }
        else {
            System.out.println("用户登录成功！");
            isSuccess = true;
            int user_id = user.getUser_id();
            int user_type = user.getUserType();
            String user_name = user.getUsername();
            json.put("user_id", String.valueOf(user_id));
            json.put("user_type", String.valueOf(user_type));
            json.put("user_name", user_name);
            System.out.println("json  " + json);
        }

        return json;
    }

    @RequestMapping(value="/register")
    public int register(@RequestBody Map<String,String> param){
        return userService.register(param);
    }

    @RequestMapping("/checkSession")
    public boolean checkSession(){
        if(isSuccess == true) {
            System.out.println("nowe check true");
            return true;
        }
        else{
            System.out.println("nowe false");
            return false;
        }
    }
    @RequestMapping("/showAllUsers")
    public List<User> listUsers(){
        List<User> list = userService.listUsers();
        for(User user : list){
            System.out.println(user.getUsername() + "  " + user.getUserType());
        }
        return list;
    }

    @RequestMapping("/updateUserType")
    public int updateUserType(@RequestBody Map<String, String> param){
        return userService.updateUserType(param);
    }

    @RequestMapping("/checkUserStatus")
    public int checkUserType(@RequestBody Map<String, String> param){
        return userService.checkUserType(param);
    }

    @RequestMapping("/getTopUser")
    public List<User> getTopUser(@RequestBody Map<String, String> param){
        return userService.getTopUser(param);
    }

    @RequestMapping("/findNameDup")
    public boolean findNameDup(@RequestBody Map<String,String> param){
        return userService.findNameDup(param);
    }
}

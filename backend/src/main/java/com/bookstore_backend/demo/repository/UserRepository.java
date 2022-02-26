package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.User;
import com.bookstore_backend.demo.entity.Order;
import com.bookstore_backend.demo.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "from User where username = :username and password = :password")
    User checkUser(@Param("username") String username, @Param("password") String password);

    @Query("select u from User u")
    List<User> listUsers();

    @Query("from User where user_id = :user_id")
    User getUserByUserId(int user_id);

    @Modifying
    @Transactional
    @Query(value = "update User set user_type = :user_type where user_id = :user_id")
    int updateUserType(int user_id, int user_type);

    @Query(value = "select user_type from User where user_id = :user_id")
    int checkUserType(int user_id);

    @Query(value = "from User where username = :username")
    User findNameDup(String username);

    @Query(value = "select user_id from User where username = :username")
    int getUserIdbyUsername(String username);
}

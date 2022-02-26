package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    @Query("select o from Order o")
    List<Order> showAllOrders();

    @Query("select o from Order o where o.user_id = :user_id")
    List<Order> showOneOrder(int user_id);


    @Query("from Order where order_id = :order_id")
    Order findOrder(Integer order_id);

    @Query(value = "select user_id, SUM(totalmoney) as sumtotal from Order where (time > :minDate " +
            "and time < :maxDate) or time like :maxDate% group by user_id order by sumtotal DESC ")
    List<List<Integer>> getOrdersByTime(String minDate, String maxDate);
}
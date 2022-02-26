package com.bookstore_backend.demo.dao;

import com.bookstore_backend.demo.entity.Order;
import com.bookstore_backend.demo.entity.OrderItem;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

public interface OrderDao {
    boolean addOne(Map<Object, Object> param);
    boolean addOrderOne(Map<Object, Object> param);
    List<Order> showAllOrders();
    List<Order> showOneOrder(Map<Object, Object> param);
    List<Order> oneStatistics(Map<Object, Object> param);
    Order findOrder(Integer id);
    List<OrderItem> findOrderItems(Integer id);
    List<OrderItem> findOrderItemsByTime(Map<Object, Object> param);
    List<OrderItem> userFindOrderItemsByTime(Map<Object, Object> param);
}

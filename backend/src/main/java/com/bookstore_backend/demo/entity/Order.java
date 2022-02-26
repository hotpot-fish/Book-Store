package com.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Map;
@Entity
@Table(name = "orders")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "order_id")
public class Order {
    @Id
    @GeneratedValue(generator = "increment")
    @Column(name = "order_id")
    private int order_id;

    @Column(name = "user_id")
    private int user_id;

    @Column(name = "totalmoney")
    private int totalmoney;

    @Column(name = "time")
    private String time;

    @Transient
    private List<String> books;
    @Transient
    private Map<String,Integer> booktonum;
    public int getOrder_id(){
        return order_id;
    }
    public int getUser_id(){
        return user_id;
    }
    public int getTotalmoney(){
        return totalmoney;
    }

    public String getTime(){
        return time;
    }

    public List<String> getBooks(){
        return books;
    }

    public Map<String,Integer> getBooktonum(){
        return booktonum;
    }

    public void setOrder_id(int order_id){
        this.order_id = order_id;
    }

    public void setUser_id(int user_id){
        this.user_id = user_id;
    }

    public void setTotalmoney(int totalmoney){
        this.totalmoney = totalmoney;
    }

    public void setTime(String time){
        this.time = time;
    }

    public void setBooks(List<String> books){
        this.books = books;
    }

    public void setBooktonum(Map<String, Integer> books){
        this.booktonum = books;
    }

}

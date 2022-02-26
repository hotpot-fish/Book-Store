package com.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Table(name = "order_item")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "order_item_id")
public class OrderItem {
    @Id
    @GeneratedValue(generator = "increment")
    @Column(name = "order_item_id")
    private int order_item_id;

    @Column(name = "order_id")
    private int order_id;

    @Column(name = "book_id")
    private int book_id;

    @Column(name = "price")
    private int price;

    @Column(name = "num")
    private int num;

    @Column(name = "time")
    private String time;

    @Transient
    private String name;

    public int getOrder_item_id(){
        return order_item_id;
    }

    public int getOrder_id(){
        return order_id;
    }

    public int getPrice(){
        return price;
    }

    public int getNum(){
        return num;
    }

    public int getBook_id(){
        return book_id;
    }

    public String getTime(){
        return time;
    }

    public String getName(){
        return name;
    }

    public void setOrder_item_id(int order_item_id){
        this.order_item_id = order_item_id;
    }

    public void setOrder_id(int order_id){
        this.order_id = order_id;
    }

    public void setPrice(int price){
        this.price = price;
    }

    public void setNum(int num){
        this.num = num;
    }

    public void setBook_id(int book_id){
        this.book_id = book_id;
    }

    public void setTime(String time){
        this.time = time;
    }

    public void setName(String name){
        this.name = name;
    }
}

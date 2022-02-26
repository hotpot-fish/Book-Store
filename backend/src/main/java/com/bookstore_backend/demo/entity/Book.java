package com.bookstore_backend.demo.entity;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "isbn")
    private int isbn;

    @Column(name = "name")
    private String name;

    @Column(name = "author")
    private String author;

    @Column(name = "type")
    private String type;

    @Column(name = "inventory")
    private int inventory;

    @Column(name = "price")
    private int price;

    @Column(name = "img")
    private String img;

    @Column(name = "description")
    private String description;

    @Column(name = "isshow")
    private int status;

    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public void setAuthor(String author){
        this.author = author;
    }
    public String getAuthor(){
        return author;
    }
    public void setType(String type){
        this.type = type;
    }
    public String getType(){
        return type;
    }
    @Transactional(propagation = Propagation.SUPPORTS)
    public void set(int inventory){
        this.inventory = inventory;
    }
    public int getInventory(){
        return inventory;
    }
    public void setPrice(int price){
        this.price = price;
    }
    public int getPrice(){
        return price;
    }
    public void setID(int id){
        this.id = id;
    }
    public int getId(){
        return id;
    }
    public void setImg(String img){
        this.img = img;
    }
    public String getImg(){
        return img;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public String getDescription(){
        return description;
    }
    public int getStatus(){
        return status;
    }
    public void setStatus(int status){
        this.status = status;
    }
    public void setISBN(int ISBN){
        this.isbn = isbn;
    }
    public int getISBN(){
        return isbn;
    }
}

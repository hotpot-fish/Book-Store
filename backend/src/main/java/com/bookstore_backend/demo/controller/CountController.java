package com.bookstore_backend.demo.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.concurrent.atomic.AtomicInteger;

@RestController
public class CountController {
    private AtomicInteger count = new AtomicInteger(0);
    private void increment() {count.incrementAndGet();}
    private void decrement() {count.decrementAndGet();}
    private int value() {return  count.get();}

    @RequestMapping("/listcount")
    public int getCount(){
        increment();
        int n = value();
        return n;
    }
}

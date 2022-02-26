package com.bookstore_backend.demo.serviceimpl;

import com.bookstore_backend.demo.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("session")
public class TimeServiceImpl implements TimeService {
    private int initial = 0;
    public int UpdateTime() {
        initial++;
        return initial;
    }
}

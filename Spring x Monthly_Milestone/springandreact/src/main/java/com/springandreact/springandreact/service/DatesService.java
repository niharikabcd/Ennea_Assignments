package com.springandreact.springandreact.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springandreact.springandreact.model.Dates;
import com.springandreact.springandreact.repository.Datesrepo;

@Service
public class DatesService {
    @Autowired
    private Datesrepo datesrepo;

    public Dates saveDates(Dates dates){
        return datesrepo.save(dates);
    }

}

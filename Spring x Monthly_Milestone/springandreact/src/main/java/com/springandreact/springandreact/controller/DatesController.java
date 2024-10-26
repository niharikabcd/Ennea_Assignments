package com.springandreact.springandreact.controller;

import org.springframework.web.bind.annotation.RestController;

import com.springandreact.springandreact.model.Dates;
import com.springandreact.springandreact.service.DatesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
public class DatesController {
    @Autowired
    private DatesService datesService;

    //for adding new manufactured and expiry dates through Datepicker into dates Database
    @PostMapping("/add_dates")
     public ResponseEntity<Dates> addDates(@RequestBody Dates entity) {

        Dates savedEntity = datesService.saveDates(entity);
        return new ResponseEntity<>(savedEntity, HttpStatus.CREATED); // Returning 201 Created
    }

}

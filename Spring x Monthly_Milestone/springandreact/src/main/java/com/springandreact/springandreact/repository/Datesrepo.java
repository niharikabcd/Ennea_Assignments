package com.springandreact.springandreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springandreact.springandreact.model.Dates;

@Repository
public interface Datesrepo extends JpaRepository<Dates,Long>{
    
}

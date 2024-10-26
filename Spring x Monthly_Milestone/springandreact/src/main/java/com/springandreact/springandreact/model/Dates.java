package com.springandreact.springandreact.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Dates {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long dateid;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date manDate;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date expDate;

}

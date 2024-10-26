package com.springandreact.springandreact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springandreact.springandreact.model.ProductData;
import com.springandreact.springandreact.service.ProductDataService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@RestController
@RequestMapping("/product_data")
@CrossOrigin
public class ProductDataController {
    @Autowired
    private ProductDataService productdataservice;

    //adding new collection/productdata with modal input>confirmation page
    @PostMapping("/add")
    public ProductData postMethodName(@RequestBody ProductData entity) {

        productdataservice.saveProductData(entity);
        
        return entity;
    }
    
    //getting product categories for dropdown list in search
    @GetMapping("/getcategories")
    public List<String> getCategories() {
        return productdataservice.getUniqueCategories();
    }
    
    //getting product data with selected Category from search input component
    @GetMapping("/getProductsByCategory/{category}")
    public List<ProductData> getProductsByCategory(@PathVariable String category){
        return productdataservice.getProductsByCategory(category);
    }

}
    


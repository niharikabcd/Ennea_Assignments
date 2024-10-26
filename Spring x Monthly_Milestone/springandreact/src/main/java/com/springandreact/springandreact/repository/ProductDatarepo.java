package com.springandreact.springandreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


import com.springandreact.springandreact.model.ProductData;

@Repository
public interface ProductDatarepo extends JpaRepository<ProductData,Long> {
    @Query("SELECT DISTINCT p.category FROM ProductData p")
    List<String> findDistinctCategories();
    List<ProductData> findByCategory(String category);
    
}

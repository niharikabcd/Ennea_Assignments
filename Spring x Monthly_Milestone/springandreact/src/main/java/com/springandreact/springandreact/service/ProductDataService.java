package com.springandreact.springandreact.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.springandreact.springandreact.model.ProductData;
import com.springandreact.springandreact.repository.ProductDatarepo;
import java.util.List;

@Service
public class ProductDataService {
    @Autowired
    private ProductDatarepo productdatarepo;

    public ProductData saveProductData(ProductData product) {
        return productdatarepo.save(product);
    }

    public List<String> getUniqueCategories() {
        return productdatarepo.findDistinctCategories();
    }

    public List<ProductData> getProductsByCategory(String category){
        return productdatarepo.findByCategory(category);
    }
}

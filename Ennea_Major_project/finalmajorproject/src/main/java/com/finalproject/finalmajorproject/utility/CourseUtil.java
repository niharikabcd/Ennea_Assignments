package com.finalproject.finalmajorproject.utility;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CourseUtil {
    public static ResponseEntity<String> getrResponseEntity(String responseMessage,HttpStatus httpStatus) {
     return new ResponseEntity<String>("{\"message\":\""+responseMessage+"\"}",httpStatus);  
    }
}

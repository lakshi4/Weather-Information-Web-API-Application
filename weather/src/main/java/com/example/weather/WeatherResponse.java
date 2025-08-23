package com.example.weather;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

//this model maps the JSON structure returned by the weather API
@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherResponse {
    
   private int count;
    @JsonProperty("list")
    private List<WeatherData> list;

    public int getCount() {
        return count;
    }
    public void setCount(int count) {
        this.count = count;
           
    }
    public List<WeatherData> getList() {
        return list;
    }
    public void setList(List<WeatherData> list) {
        this.list = list;
    }
    
}



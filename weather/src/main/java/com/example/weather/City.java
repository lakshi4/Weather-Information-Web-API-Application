package com.example.weather;

import com.fasterxml.jackson.annotation.JsonProperty;

public class City {

    @JsonProperty("CityCode")
    private String cityCode;

    @JsonProperty("CityName")
    private String cityName;

    @JsonProperty("Temp")
    private String temp;

    @JsonProperty("Status")
    private String status;

    public String getCityCode() {
        return cityCode;
    }
    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }
    public String getCityName() {
        return cityName;
    }
    public void setCityName(String cityName) {
        this.cityName = cityName;
    }
    public String getTemp() {
        return temp;
    }
    public void setTemp(String temp) {
        this.temp = temp;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    
}

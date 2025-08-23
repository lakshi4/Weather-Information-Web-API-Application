package com.example.weather;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CitiesList {
    

    @JsonProperty("cities")
    private List<City> cities;

    public List<City> getCities() {
        return cities;
    }
    public void setCities(List<City> cities) {
        this.cities = cities;
    }

}

package com.example.weather;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.weather.City;
import com.example.weather.WeatherService;


@RestController
@RequestMapping("/weather")

public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/cities")
    public List<City> getCities() {
        return weatherService.getCities();
    }

    @GetMapping("/data")
    public List<WeatherData> getWeatherData() {
        return weatherService.getWeatherData();
    }
}


    

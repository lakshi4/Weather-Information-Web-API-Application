package com.example.weather;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.weather.City;
import com.example.weather.WeatherService;
import com.example.weather.WeatherData;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/weather")
@CrossOrigin(origins = "http://localhost:5173")

public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    // @GetMapping("/{cityName}")
    // public WeatherData getWeatherByCity(@PathVariable String cityName) {
    // List<WeatherData> allWeather = weatherService.getWeatherData();
    // // Find the weather data for the requested city
    // return allWeather.stream()
    //     .filter(w -> w.getCityName().equalsIgnoreCase(cityName))
    //     .findFirst()
    //     .orElse(null);
    // }

    @GetMapping("/{cityName}")
    public WeatherData getWeatherByCityName(@PathVariable String cityName) {
        return weatherService.getWeatherByCityName(cityName);
    }



    @GetMapping("/cities")
    public List<City> getCities() {
        return weatherService.getCities();
    }

    // @GetMapping("/data")
    // public List<WeatherData> getWeatherData() {
    //     return weatherService.getWeatherData();
    // }
}




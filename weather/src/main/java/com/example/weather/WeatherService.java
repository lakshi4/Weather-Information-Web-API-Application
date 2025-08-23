package com.example.weather;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.weather.WeatherResponse;
import com.example.weather.WeatherData;
import com.example.weather.CitiesList;
import com.example.weather.City;

@Service
public class WeatherService {

    @Value("${openweather.api.key}" )
    private String apiKey;

    @Value("${openweather.api.url}")
    private String apiUrl;



    private RestTemplate restTemplate;
    private ObjectMapper objectMapper;

    public WeatherService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Cacheable(value = "weatherData", key = "#city",unless = "#result == null")

    public List<WeatherData> getWeatherData() {
   
        try {

            // Read cities from JSON file
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("cities.json");

            CitiesList citiesList = objectMapper.readValue(inputStream, CitiesList.class);

            List<City> cities = citiesList.getCities();

            //Extract the city code
            String cityIds = cities.stream()
                .map(City::getCityCode)
                .collect(Collectors.joining(","));

                //Fetch weather data from OpenWeatherMap API
                String url = apiUrl + "?id=" + cityIds + "&appid=" + apiKey + "&units=metric";
                WeatherResponse response = restTemplate.getForObject(url, WeatherResponse.class);

                return response != null ? response.getList() : new ArrayList<>();
            


        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch weather data", e);
        }
    }

    public List<City> getCities() {
        try (InputStream inputStream = getClass().getResourceAsStream("cities.json")) {
        JsonNode root = objectMapper.readTree(inputStream);
        JsonNode citiesNode = root.get("cities");
        return objectMapper.convertValue(citiesNode, new TypeReference<List<City>>() {});
    } catch (Exception e) {
        throw new RuntimeException("Failed to load cities.json", e);
    }
    }

    
}





    


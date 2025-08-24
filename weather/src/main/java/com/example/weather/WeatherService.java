package com.example.weather;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
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

    @Cacheable(value = "weatherData",unless = "#result == null")

    public WeatherData getWeatherByCityName(String cityName) {
        try {
            if (cityName == null || cityName.trim().isEmpty()) {
                throw new IllegalArgumentException("City name cannot be null or empty");
            }

            String encodedCityName = java.net.URLEncoder.encode(cityName.trim(), "UTF-8");
            // Ensure apiUrl ends with /data/2.5
            String url = apiUrl + "/weather?q=" + encodedCityName + "&appid=" + apiKey + "&units=metric";

            System.out.println("Marking API call to :" + url.replace(apiKey, "****"));

            WeatherData response = restTemplate.getForObject(url, WeatherData.class);

            if (response == null) {
                throw new RuntimeException("No weather data found for city: " + cityName);
            }
            return response;
            
        } catch (HttpClientErrorException e) {
            // Handle 4xx errors (like city not found)
            throw new RuntimeException("City not found or invalid request for: " + cityName + ". Status: " + e.getStatusCode(), e);
        } catch (HttpServerErrorException e) {
            // Handle 5xx errors from the API
            throw new RuntimeException("Weather service temporarily unavailable. Status: " + e.getStatusCode(), e);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch weather for city: " + cityName + ". Error: " + e.getMessage(), e);
        }
      
}

    public List<City> getCities() {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("cities.json")) {
            if (inputStream == null) {
                throw new RuntimeException("cities.json file not found in resources");
            }   
        
            JsonNode root = objectMapper.readTree(inputStream);
            JsonNode citiesNode = root.get("cities");

            if(citiesNode == null){
                throw new RuntimeException("No cities data found in cities.json");
            }
            return objectMapper.convertValue(citiesNode, new TypeReference<List<City>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to load cities.json", e);
        }
    }

    
}








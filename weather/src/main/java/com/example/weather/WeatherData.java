package com.example.weather;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)

public class WeatherData {
    private String cityCode;
    private String cityName;

    @JsonProperty("weather")
    private Weather[] weather;

    @JsonProperty("main")
    private Main main;

    @JsonProperty("sys")
    private Sys sys;

    @JsonProperty("wind")
    private Wind wind;

    private long visibility;

    //nested classes to map JSON structure
    public static class Weather {
       
        private String description;

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Main {
        private double temp;
        private int humidity;
        private int pressure;


        @JsonProperty("temp_min")
        private double temp_min;

        @JsonProperty("temp_max")
        private double temp_max;


        public double getTemp_min() {
            return temp_min;
        }
        public void setTemp_min(double temp_min) {
            this.temp_min = temp_min;
        }
        public double getTemp_max() {
            return temp_max;
        }   

        public double getTemp() {
            return temp;
        }

        public void setTemp(double temp) {
            this.temp = temp;
        }

        public int getHumidity() {
            return humidity;
        }

        public void setHumidity(int humidity) {
            this.humidity = humidity;
        }
        public int getPressure() {
            return pressure;
        }   
        public void setPressure(int pressure) {
            this.pressure = pressure;
        }   
    }
    public static class Sys {
        private String country;
        private long sunrise;
        private long sunset;
        

        public long getSunrise() {
            return sunrise;
        }
        public void setSunrise(long sunrise) {
            this.sunrise = sunrise;
        }   
        public long getSunset() {
            return sunset;
        }
        public void setSunset(long sunset) {
            this.sunset = sunset;
        }

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }
        
    }

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
        public Weather[] getWeather() {
            return weather;
        }
        public void setWeather(Weather[] weather) {
            this.weather = weather;
        }
        public Main getMain() {
            return main;
        }
        public void setMain(Main main) {
            this.main = main;
        }
        public Sys getSys() {
            return sys;
        }
        public void setSys(Sys sys) {
            this.sys = sys;
        }
        public long getVisibility() {
            return visibility;
        }
        public void setVisibility(long visibility) {
            this.visibility = visibility;
        }


public static class Wind {
        private double windSpeed;
        private String windDirection;

    public double getWindSpeed() {
            return windSpeed;
        }
        public void setWindSpeed(double windSpeed) {
            this.windSpeed = windSpeed;
        }

        public String getWindDirection() {
            return windDirection;
        }   
        public void setWindDirection(String windDirection) {
            this.windDirection = windDirection;
        }
}

 public Wind getWind() {
            return wind;
        }
        public void setWind(Wind wind) {
            this.wind = wind;
        }

    
}

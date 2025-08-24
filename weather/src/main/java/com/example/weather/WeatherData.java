package com.example.weather;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WeatherData {
    private String cityCode;
    private String cityName;

    @JsonProperty("weather")
    private Weather[] weather;
    @JsonProperty("main")
    private Main main;

    @JsonProperty("syst")
    private Syst syst;

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
    public static class Syst {
        private String country;
        private long sunrise;
        private long sunset;
        private double windSpeed;
        private String windDirection;

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

        public String getCitycode() {
            return cityCode;
        }
        public void setCitycode(String cityCode) {
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
        public Syst getSyst() {
            return syst;
        }
        public void setSyst(Syst syst) {
            this.syst = syst;
        }
        public long getVisibility() {
            return visibility;
        }
        public void setVisibility(long visibility) {
            this.visibility = visibility;
        }
    

    
}

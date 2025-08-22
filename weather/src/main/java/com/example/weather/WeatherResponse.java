package com.example.weather;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

//this model maps the JSON structure returned by the weather API
@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherResponse {
    
    @JsonProperty("weather")
    private Main main;

    public Main getMain(){
        return main;
    }
    public void setMain(Main main) {
        this.main = main;
    }
   

    public static class Main{
        @JsonProperty("temp")
        private Double temp;


        public Double getTemp() {
            return temp;
        }

        public void setTemp(double temp) {
            this.temp = temp;
        }

       
        
    }
    


}

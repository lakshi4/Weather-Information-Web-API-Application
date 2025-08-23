package com.example.weather;

import java.util.concurrent.TimeUnit;
import org.springframework.cache.CacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableCaching

public class CacheConfig {

    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("weatherData");
    }
    
    //clear cache every 5 min
    @Scheduled(fixedRate = 5, timeUnit =TimeUnit.MINUTES)
    public void clearCache(){
        cacheManager().getCache("weatherData").clear();
    }
}

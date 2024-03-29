
class Weather {
    constructor() {
        this.latitude;
        this.longitude;
        this.locationName;
        this.temperature;
        this.main;
        this.description;
        this.requestURL;
        //this.requestURL = "https://api.openweathermap.org/data/2.5/weather?lat=43.7314&lon=7.419&units=imperial&appid=b500430b0da641eda0c3a8a5dea9ca0e";
    }
    setLocation(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=imperial&appid=b500430b0da641eda0c3a8a5dea9ca0e`;
    }

    extractWeatherData(data) {
        this.temperature = data.main.temp;
        this.main = data.weather[0].main;
        this.description = data.weather[0].description;
        this.locationName = data.name;
        console.log(this.requestURL);
        console.log(this.latitude);
        console.log(this.longitude);
        console.log(this.locationName);
        console.log(this.temperature);
        console.log(this.main);
        console.log(this.description);
    }

}



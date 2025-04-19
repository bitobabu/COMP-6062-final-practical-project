
const app = Vue.createApp({
    data() {
      return {
        user: {
          name: '',
          age: '',
          email: '',
          photo: ''
        },
        location: {
          city: 'London',
          province: 'Ontario',
          country: 'Canada'
        },
        weather: null,
        wordQuery: '',
        definition: null
      };
    },
    computed: {
      fullLocation() {
        return `${this.location.city}, ${this.location.province}, ${this.location.country}`;
      }
    },
    methods: {
      fetchUser() {
        fetch('https://comp6062.liamstewart.ca/random-user-profile')
          .then(response => response.json())
          .then(data => {
            this.user = {
              name: `${data.first_name} ${data.last_name}`,
              age: data.age,
              email: data.email,
              photo: data.profile_picture
            };
          })
          .catch(error => console.error('User Error:', error));
      },
  
      fetchWeather() {
        const { city, province, country } = this.location;
        const url = `http://comp6062.liamstewart.ca/weather-information?city=${city}&province=${province}&country=${country}`;
  
        fetch(url)
          .then(response => {
            if (!response.ok) throw new Error('Weather fetch failed');
            return response.json();
          })
          .then(data => {
            this.weather = {
              temperature: data.temperature,
              wind: data.wind_speed,
              description: data.weather_description,
              city: data.location.city,
              region: data.location.region,
              country: data.location.country,
              latitude: data.location.latitude,
              longitude: data.location.longitude,
              population: data.location.population
            };
          })
          .catch(error => console.error('Weather Fetch Error:', error));
      },
  
      fetchDefinition() {
        if (!this.wordQuery.trim()) return;
  
        const url = `https://comp6062.liamstewart.ca/define?word=${this.wordQuery}`;
  
        fetch(url)
          .then(response => {
            if (!response.ok) throw new Error('Definition fetch failed');
            return response.json();
          })
          .then(data => {
            const first = data[0];
            this.definition = {
              word: first.word,
              phonetic: first.phonetic,
              definition: first.definition
            };
          })
          .catch(error => console.error('Definition Fetch Error:', error));
      }
    },
    created() {
      this.fetchUser();
      this.fetchWeather();
    }
  });
  
  app.mount('#app');
  

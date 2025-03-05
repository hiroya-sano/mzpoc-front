<template>
    <div id="app">
      <h1>購入したい車情報登録</h1>
      <form @submit.prevent="submitCar">
        <div>
          <label>車種: </label>
          <input v-model="car.model" required>
        </div>
        <div>
          <label>オーダーカスタム: </label>
          <input v-model="car.custom" required>
        </div>
        <button type="submit">登録</button>
      </form>
  
      <h2>登録済み車情報</h2>
      <ul>
        <li v-for="item in cars" :key="item.id">
          {{ item.model }} - {{ item.custom }}
        </li>
      </ul>
    </div>
  </template>
  
<script>
export default {
  name: 'App',
  data() {
    return {
      car: {
        model: '',
        custom: ''
      },
      cars: [],
      apiUrl: `${import.meta.env.VITE_API_PROTOCOL}://${window.location.hostname}${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_PATH}`
    }
  },
  mounted() { 
    this.fetchCars();
  },  
  methods: {
    fetchCars() {
      fetch(`${this.apiUrl}/cars`)
        .then(response => response.json())
        .then(data => {
          this.cars = data;
        })
        .catch(err => console.error(err));
    },
    submitCar() {
      fetch(`${this.apiUrl}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.car)
      })
      .then(response => response.json())
      .then(data => {
        this.cars.push(data);
        this.car.model = '';
        this.car.custom = '';
      })
      .catch(err => console.error(err));
    }
  }
}
</script>
  
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
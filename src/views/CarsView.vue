<template>
  <div>
    <h2>登録済み車情報</h2>
    <ul>
      <li v-for="item in cars" :key="item.id">
        {{ item.model }} - {{ item.custom }}
      </li>
    </ul>
    <router-link to="/submit">車情報登録</router-link>
  </div>
</template>
  
<script>
export default {
  name: 'CarsView',
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
    }
  }
}
</script>

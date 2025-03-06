<template>
  <div id="app">
    <h2>削除したい車情報</h2>
    <form @submit.prevent="deleteCar">
      <div>
        <label>ID: </label>
        <input v-model="car.id" required>
      </div>
      <button type="delete">削除</button>
    </form>
  </div>
  <br>
  <router-link to="/">戻る</router-link>
</template>
  
<script>
  export default {
    name: 'Delete',
    data() {
      return {
        car: {
          id: ''
        },
        cars: [],
        apiUrl: `${import.meta.env.VITE_API_PROTOCOL}://${window.location.hostname}${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_PATH}`
      }
    },
    methods: {
      deleteCar() {
        fetch(`${this.apiUrl}/cars/${this.car.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.car)
        })
        // .then(response => response.json())
        .then(data => {
          this.car.id = ''
        })
        .catch(err => console.error(err));
      }
    }
  }
</script>
    
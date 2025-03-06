<template>
  <div id="app">
    <h2>購入したい車情報登録</h2>
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
  </div>
  <br>
  <router-link to="/">戻る</router-link>
</template>

<script>
  export default {
    name: 'Submit',
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
    methods: {
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
  
<template>
  <div>
    <h2>登録済み車情報</h2>
    <div>
      <input v-model="searchKeyword" placeholder="車種で検索" />
      <button @click="searchCars">検索</button>
      <button @click="resetsearch">全件表示</button>
    </div>
    <ul>
      <li v-for="item in cars" :key="item.id">
        {{ item.id }} - {{ item.model }} - {{ item.custom }}
      </li>
    </ul>
    <router-link to="/submit">車情報登録</router-link>
    <br>
    <router-link to="/delete">車情報削除</router-link>
    <br><br>
    <router-link to="/test">検証用</router-link>
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
        searchKeyword: "",
        apiUrl: `${import.meta.env.VITE_API_PROTOCOL}://${window.location.hostname}${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_PATH}`
      }
    },
    methods: {
      fetchCars() {
        let url = `${this.apiUrl}/cars`
        if (this.searchKeyword && this.searchKeyword.trim() !== "") {
          url += '?model=' + encodeURIComponent(this.searchKeyword);
        }
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error("No car records found.");
            }
            return response.json();
          })
          .then(data => {
            this.cars = data;
          })
          .catch(err => console.error(err));
      },
      searchCars() {
        this.fetchCars();
      },
      resetsearch() {
        this.searchKeyword = '';
        this.fetchCars();
      }
    }
  }
</script>

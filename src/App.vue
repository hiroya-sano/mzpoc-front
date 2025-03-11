<template>
  <router-view />
  <br><br><br>
  <div>
    <button @click="sleepCall">API大量コール（{{ this.API_CALL_COUNT }}回）</button>
    <div>{{ this.sleepFin }}</div>
  </div>
  <br>
  <div>
    <button @click="memoryLeak">メモリリーク</button>
    <div>{{ this.memoryLeakFin }}</div>
  </div>
  <br>
  <div>
    <input v-model="searchKeyword" placeholder="descriptionで検索" />
    <button @click="heavyQuery">重いクエリ</button>
    <div>{{ this.heavyQueryFin }}</div>
    <ul>
      <li v-for="item in hdatas" :key="item.id">
        {{ item.id }} - {{ item.category }} - {{ item.value }} - {{ item.description }}
      </li>
    </ul>
  </div>
  <br>
  <div>
    <button @click="dummyErrors">500エラー発生（テスト）</button>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        apiUrl: `${import.meta.env.VITE_API_PROTOCOL}://${window.location.hostname}${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_PATH}`,
        API_CALL_COUNT: 20,
        sleepFin: '',
        memoryLeakFin: '',
        heavyQueryFin: '',
        searchKeyword: '',
        hdatas: []
      }
    },
    methods: {
      fetchSleep(n) {
        let url = `${this.apiUrl}/sleep`;
        fetch(url)
          .then(response => {
            if (n == this.API_CALL_COUNT) {
              this.sleepFin = 'APIコール完了'
            }
            return response.json();
          })
          .catch(err => {
            console.error(err);
            throw new Error("API Call error.");
          });
      },
      sleepCall() {
        let n = 0;
        while (n < this.API_CALL_COUNT) {
          n += 1;
          this.fetchSleep(n);
        }
      },
      fetchMemoryRelease() {
        let url = `${this.apiUrl}/memoryLeak/release`
        fetch(url)
          .then(response => {
            return response.json();
          })
          .catch(err => {
            console.error(err);
            throw new Error("Memory release error.");
          });
      },
      fetchMemoryLeak(n) {
        let url = `${this.apiUrl}/memoryLeak`
        fetch(url)
          .then(response => {
            if (n == this.API_CALL_COUNT) {
              this.fetchMemoryRelease();
              this.memoryLeakFin = 'メモリリーク完了'
            }
            return response.json();
          })
          .catch(err => {
            console.error(err);
            throw new Error("Memory leak error.");
          });
      },
      memoryLeak() {
        let n = 0;
        while (n < this.API_CALL_COUNT) {
          n += 1;
          this.fetchMemoryLeak(n);
        }
      },
      heavyQuery() {
        let url = `${this.apiUrl}/heavyData?description=${this.searchKeyword}`
        fetch(url)
          .then(response => {
            this.heavyQueryFin = '重いクエリ完了'
            return response.json();
          })
          .then(data => {
            this.hdatas = data;
          })
          .catch(err => {
            console.error(err);
            throw new Error("Heavy query error.");
          });
      },
      dummyErrors() {
        let url = `${this.apiUrl}/dummyerrors`
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error("Errors(Test).");
            }
            return response.json();
          })
          .catch(err => {
            console.error(err);
            throw new Error("Errors(Test).");
          });
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
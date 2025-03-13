<template>
  <h2>検証用ページ</h2>
  <div>
    <button @click="sleepMultiCall">API大量コール（{{ this.API_CALL_COUNT }}回）</button>
    <button @click="sleepCall">APIコール</button>
    <div>{{ this.sleepFin }}</div>
  </div>
  <br>
  <div>
    <button @click="fetchMemoryLeak">メモリリーク</button>
    <button @click="fetchMemoryRelease">メモリ解放</button>
    <div>{{ this.memoryLeakFin }}</div>
  </div>
  <br>
  <div>
    <button @click="heavyQuery">重いクエリ</button>
    <div>{{ this.heavyQueryFin }}</div>
  </div>
  <br>
  <div>
    <input v-model="fibN" placeholder="フィボナッチ数列n値：" />
    <button @click="cpuLoad">CPU負荷</button>
    <div>{{ this.cpuLoadFin }}</div>
  </div>
  <br>
  <div>
    <button @click="dummyErrors">500エラー発生（テスト）</button>
    <div>{{ this.dumErrorFin }}</div>
  </div>
  <br>
  <router-link to="/">戻る</router-link>
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
        fibN: '',
        cpuLoadFin: '',
        dumErrorFin: ''
      }
    },
    methods: {
      async sleepCall() {
        let url = `${this.apiUrl}/sleep`;
        let n = 0;
        await fetch(url);
        this.sleepFin = `APIコール完了`
      },
      async sleepMultiCall() {
        let url = `${this.apiUrl}/sleep/multi`;
        let n = 0;
        for (let n = 0; n < this.API_CALL_COUNT; n++) {
          await fetch(url);
          if (n == this.API_CALL_COUNT - 1) {
            this.sleepFin = `${this.API_CALL_COUNT}回のAPIコール完了`
          }
        }
      },
      fetchMemoryRelease() {
        let url = `${this.apiUrl}/memoryLeak/release`
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error("Error by memory release.");
            }
            this.memoryLeakFin = '';
            return response.json();
          })
          .catch(err => {
            console.error(err);
            throw new Error("Memory release error.");
          });
      },
      fetchMemoryLeak() {
        let url = `${this.apiUrl}/memoryLeak`
        fetch(url)
          .then(response => {
            if (!response.ok) {
              this.memoryLeakFin = `メモリリークエラー発生（httpステータス：${response.status}）。Podの再起動を推奨`;
              throw new Error("Error by memory leak.");
            }
            this.memoryLeakFin = 'OK';
            return response.json();
          })
          .catch(err => {
            console.error(err);
            throw new Error("Memory leak error.");
          });
      },
      heavyQuery() {
        let url = `${this.apiUrl}/heavyData`
        fetch(url)
          .then(response => {
            if (!response.ok) {
              this.heavyQueryFin = `重いクエリエラー発生（httpステータス：${response.status}）`
              throw new Error("Error by heavy query.");
            }
            this.heavyQueryFin = '重いクエリ完了'
            return response.json();
          })
          .catch(err => {
            console.error(err);
            throw new Error("Error by heavy query.");
          });
      },
      cpuLoad() {
        let url = `${this.apiUrl}/cpuload`;
        if (this.fibN) {
          url += `?n=${this.fibN}`;
        }
        fetch(url)
          .then(response => {
            if (!response.ok) {
              this.cpuLoadFin = `フィボナッチ数列エラー発生（httpステータス：${response.status}）`
              throw new Error("Error by cpu load.");
            }
            return response.text();
            })
          .then(text => {
            this.cpuLoadFin = `フィボナッチ数列完了：${text}`
          })
          .catch(err => {
            console.error(err);
            throw new Error("Error by cpu load.");
          });
      },
      dummyErrors() {
        let url = `${this.apiUrl}/dummyerrors`
        fetch(url)
          .then(response => {
            if (!response.ok) {
              this.dumErrorFin = 'エラー発生';
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

<template>
  <router-view />
  <br><br><br>
  <div>
    <button @click="dummyErrors">エラー発生（テスト）</button>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        apiUrl: `${import.meta.env.VITE_API_PROTOCOL}://${window.location.hostname}${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_PATH}`
      }
    },
    methods: {
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
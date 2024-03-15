<template>
  <header class="hello">
    <div class="container">
      <h1>{{ title }}</h1>
      <div class="content">
        <slot />
      </div>
      <button @click="logout" v-if="logoff">Sair</button>
    </div>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    title: String,
    logoff: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push({ name: "Home" });
    },
  },
})
export default class Header extends Vue {
  title!: string;
}
</script>

<style scoped>
header {
  background-color: #42b983;
  height: 250px;
  width: 100%;
}
.container {
  width: 70%;
  margin: 0 auto;
  max-width: 1200px;
  padding-top: 5%;
  position: relative;
}
.container h1 {
  margin-bottom: 15px;
  color: #fff;
}
button {
  background: #147e4e;
  border: 0;
  padding: 10px 15px;
  position: absolute;
  top: 25px;
  right: 0;
  color: #fff;
  cursor: pointer;
}
</style>

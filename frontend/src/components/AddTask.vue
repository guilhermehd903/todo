<template>
  <div class="cover" v-if="!addHidden">
    <div class="container">
      <h2>Adicionar Tarefa</h2>
      <div class="form">
        <input type="text" placeholder="Nome da tarefa" v-model="title" />
        <textarea
          placeholder="Descrição da tarefa"
          cols="30"
          rows="10"
          v-model="content"
        ></textarea>
        <button @click="close" style="background-color: #6cebb1">Fechar</button
        >&nbsp;
        <button @click="addTask">Adicionar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

// @ts-ignore
import api from "@/mixins/api.js";

@Options({
  mixins: [api],
  props: {
    addHidden: String,
  },
  data: () => ({
    title: "",
    content: "",
  }),
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push({ name: "Home" });
    },
    async addTask() {
      if (this.title && this.content) {
        let req = await this.createTask({
          title: this.title,
          content: this.content,
        });

        if (req) {
          this.hidden = false;
          if (this.response.error) {
            this.msg = this.response.message;
            this.state = "error";
          } else {
            this.msg = "Tarefa criada com sucesso";
            this.state = "success";
            this.title = "";
            this.content = "";
            this.$emit("newTask", this.response.data)
          }
        }
      }
    },
    close() {
      this.$emit("update:addHidden", true);
    },
  },
})
export default class AddTask extends Vue {
  title!: string;
}
</script>

<style scoped>
.cover {
  background-color: #42b983b3;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
}
.container {
  width: 70%;
  margin: 0 auto;
  max-width: 1200px;
  padding-top: 5%;
  position: relative;
}
button {
  background-color: #42b983;
  color: #fff;
  border: 0;
  width: 100px;
  height: 50px;
  cursor: pointer;
}
.container h2 {
  color: #fff;
  font-size: 35px;
  text-align: center;
  width: 100%;
  margin-bottom: 40px;
}
.container input,
.container textarea {
  width: 100%;
  border: 0;
  padding: 15px;
  margin-bottom: 15px;
}
</style>

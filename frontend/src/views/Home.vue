<template>
  <Msg :msg="msg" :state="state" :hidden="hidden" @click="hidden = true" />
  <Header title="Login">
    <div class="box">
      <div class="form">
        <input type="text" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Senha" v-model="pass" />
        <button @click="login">Entrar</button>
      </div>
      <div class="signUp">
        <p>Ainda não possui uma conta? <a href="/register">Clique aqui</a></p>
      </div>
    </div>
  </Header>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue"; // @ is an alias to /src
import Msg from "@/components/Msg.vue"; // @ is an alias to /src

// @ts-ignore
import api from "@/mixins/api.js";

@Options({
  components: {
    Header,
    Msg,
  },
  mixins: [api],
  data: () => ({
    email: "",
    pass: "",
    hidden: true,
    msg: "",
    state: "",
  }),
  methods: {
    async login() {
      if (this.email.length == 0 || this.pass.length == 0) {
        this.hidden = false;
        this.msg = "Informe todos os campos";
        this.state = "error";
      }

      let login = await this.loginUser({
        email: this.email,
        password: this.pass,
      });

      if (login) {
        this.hidden = false;
        if (this.response.error) {
          this.msg = this.response.message;
          this.state = "error";
        } else {
          this.msg = "Usuario autenticado com sucesso";
          this.state = "success";
          this.email = "";
          this.pass = "";

          if (!localStorage.getItem("token"))
            localStorage.setItem("token", this.response.data.jwt);

          this.$router.push({ name: "Todo" });
        }
      }
    },
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.box {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.1);
}
.box .form {
  padding: 35px;
}
.box .signUp {
  height: 50px;
  line-height: 50px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.box .signUp p {
  color: #b8b8b8;
  width: 100%;
  text-align: center;
}
.box .signUp p a {
  color: #42b983;
  text-decoration: none;
}
.box input {
  width: 100%;
  background: #f0efef;
  border: 0;
  height: 50px;
  margin-bottom: 10px;
  padding: 0 15px;
}
.box button {
  background-color: #42b983;
  color: #fff;
  border: 0;
  width: 100px;
  height: 40px;
}
</style>

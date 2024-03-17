<template>
  <Msg :msg="msg" :state="state" :hidden="hidden" @click="hidden = true" />
  <Header title="Cadastrar">
    <div class="box">
      <div class="form">
        <input type="text" placeholder="Nome" v-model="name" />
        <input type="text" placeholder="Email" v-model="email" />
        <div class="line">
          <input type="password" placeholder="Senha" v-model="pass" />
          <input
            type="password"
            placeholder="Confirmar senha"
            v-model="confPass"
          />
        </div>
        <button @click="register">Confirmar</button>
      </div>
      <div class="signUp">
        <p>Já possui uma conta? <a href="/">Clique aqui</a></p>
      </div>
    </div>
  </Header>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "../components/Header.vue"; // @ is an alias to /src
import Msg from "../components/Msg.vue"; // @ is an alias to /src

// @ts-ignore
import api from "@/mixins/api.js";

@Options({
  components: {
    Header,
    Msg,
  },
  mixins: [api],
  data: () => ({
    name: "",
    email: "",
    pass: "",
    confPass: "",
    hidden: true,
    msg: "",
    state: "",
  }),
  methods: {
    async register() {
      if (
        this.name.length == 0 ||
        this.email.length == 0 ||
        this.pass.length == 0 ||
        this.confPass.length == 0
      ) {
        this.hidden = false;
        this.msg = "Informe todos os campos";
        this.state = "error";
        return;
      }

      if (this.pass != this.confPass) {
        this.hidden = false;
        this.msg = "Senhas não coincidem";
        this.state = "error";
        return;
      }

      let add = await this.registerUser({
        name: this.name,
        email: this.email,
        password: this.pass,
      });

      if (add) {
        this.hidden = false;
        if (this.response.error) {
          this.msg = this.response.message;
          this.state = "error";
        } else {
          this.msg = "Usuario cadastrado com sucesso";
          this.state = "success";
          this.name = "";
          this.email = "";
          this.pass = "";
          this.confPass = "";
        }
      }

      console.log(add);
    },
  },
})
export default class Register extends Vue {}
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
.box .form .line {
  display: flex;
  column-gap: 15px;
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

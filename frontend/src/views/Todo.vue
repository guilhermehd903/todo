<template>
  <div>
    <Msg :msg="msg" :state="state" :hidden="hidden" @click="hidden = true" />
    <AddTask
      :addHidden="addHiddenControll"
      @update:addHidden="addHiddenControll = $event"
      @newTask="updateList"
    />
    <Header :title="`Seja bem vindo, ${nome}`" logoff :isPremium="premium">
      <div class="box" style="display: flex; column-gap: 15px">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          v-model="taskSearch"
          @keyup="filterTaskByName"
        />
        <button @click="addHiddenControll = !addHiddenControll">
          Adicionar
        </button>
      </div>
      <br />
      <div class="box">
        <ul id="tasks">
          <li v-for="t in task" :key="t.id">
            <div class="info">
              <input
                type="checkbox"
                name="check"
                v-model="t.state"
                @change="setTaskState(t)"
              />
              <p>{{ t.title }}</p>
            </div>
            <div class="buttons">
              <button class="del" @click="deleteTask(t)">Apagar</button>
              <button class="plus" @click="handleContent(t)">+</button>
            </div>
          </li>
        </ul>
      </div>
    </Header>

    <Paywall :addHidden="paywall" @update:paywall="paywall = $event" />

    <button
      v-if="activateVisible()"
      class="purchaseActive"
      @click="activateSubscription"
    >
      Ativar
    </button>
    <button
      v-if="!premium"
      class="purchase"
      @click="getPaymentLink"
      v-text="btnLoading"
    ></button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "../components/Header.vue";
import Msg from "../components/Msg.vue";
import AddTask from "../components/AddTask.vue";
import Paywall from "../components/Paywall.vue";

// @ts-ignore
import api from "@/mixins/api.js";

@Options({
  components: {
    Header,
    Msg,
    AddTask,
    Paywall,
  },
  mixins: [api],
  data: () => ({
    taskSearch: "",
    taskFull: [],
    nome: "",
    task: [],
    premium: false,
    btnLoading: "Assine ja",
    hidden: true,
    addHiddenControll: true,
    msg: "",
    state: "",
    paywall: false,
  }),
  methods: {
    activateVisible() {
      let activate = localStorage.getItem("activate") || "";
      if (activate.length > 0) return true;

      return false;
    },
    updateList(payload: any) {
      this.task.push(payload);
    },
    filterTaskByName() {
      this.task = this.taskFull.filter((obj: any) =>
        obj.title.includes(this.taskSearch)
      );
    },
    handleContent(obj: any) {
      alert(obj.content);
    },
    async getPaymentLink() {
      if (this.btnLoading == "Carregando...") return;

      this.btnLoading = "Carregando...";

      let req = await this.pay();

      this.btnLoading = "Assine ja";
      if (req) {
        localStorage.setItem("activate", this.response.data.id);
        window.location.href = this.response.data.url;
      }
    },
    async activateSubscription() {
      let req = await this.confirmPay();

      if (req) {
        window.location.reload();
        localStorage.removeItem("activate");
      }
    },
    async deleteTask(obj: any) {
      if (!window.confirm("Deseja realmente apagar essa tarefa?")) {
        return;
      }

      const req = await this.destroyTask(obj.id);

      if (req) {
        this.hidden = false;
        if (this.response.error) {
          this.msg = this.response.message;
          this.state = "error";
        } else {
          this.msg = "Tarefa apagada com sucesso";
          this.state = "success";
          this.task = this.taskFull.filter((t: any) => t.id != obj.id);
          this.taskFull = this.task;
        }
      }
    },
    async setTaskState(obj: any) {
      const req = await this.updateTask(obj.id, obj.state);

      if (req) {
        this.hidden = false;
        if (this.response.error) {
          this.msg = this.response.message;
          this.state = "error";
        } else {
          this.msg = "Tarefa atualizada com sucesso";
          this.state = "success";
        }
      }
    },
  },
  created() {
    if (!localStorage.getItem("user")) {
      this.$router.push({ name: "Home" });
    }

    let obj = localStorage.getItem("user") || "";
    let data = JSON.parse(obj);
    this.nome = data.name;
    this.task = data.tasks;
    this.taskFull = data.tasks;
    this.premium = data.premium;
  },
})
export default class Todo extends Vue {}
</script>

<style scoped>
.box {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
}
.box input {
  width: 100%;
  background: #f0efef;
  border: 0;
  height: 50px;
  padding: 0 15px;
}
.box button {
  background-color: #42b983;
  color: #fff;
  border: 0;
  width: 100px;
  height: 50px;
  cursor: pointer;
}
.box:last-of-type {
  padding: 0;
}
#tasks {
  width: 100%;
}
#tasks li {
  height: 60px;
  padding: 0 15px;
  border-bottom: 2px dashed #42b983;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#tasks li:last-of-type {
  border-bottom: 0;
}
#tasks li .info {
  display: flex;
  align-items: center;
  column-gap: 15px;
}
#tasks li .info input {
  width: 20px;
}
#tasks li .info p {
  font-size: 14px;
  opacity: 0.8;
}
#tasks li button.del {
  height: 35px;
  width: fit-content;
  padding: 0 10px;
  border: 1px solid #c44121;
  background: #fd8f73;
  cursor: pointer;
}
#tasks li button.plus {
  height: 35px;
  width: fit-content;
  padding: 0 10px;
  border: 1px solid #42b983;
  color: #42b983;
  background: transparent;
  margin-left: 15px;
  cursor: pointer;
}
.purchase,
.purchaseActive {
  background: #42b983;
  color: #fff;
  border: 0;
  position: fixed;
  right: 20px;
  bottom: 20px;
  box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.1);
  width: 150px;
  height: 50px;
  cursor: pointer;
  border-radius: 25px;
}
.purchase:hover {
  background: #248f5f;
  transform: scale(1.1);
}

.purchaseActive {
  background: #fdc173;
  bottom: 85px;
}
.purchaseActive:hover {
  background: #c09051;
  transform: scale(1.1);
}
</style>

<template>
  <p :class="state" v-if="!hidden">
    {{ msg }}
  </p>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
    state: String,
    hidden: Boolean,
  },
})
export default class Header extends Vue {
  msg!: string;
}
</script>

<style scoped>
p {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #888;
  padding: 0 15px;
  position: fixed;
  z-index: 2;
  top: 20px;
  font-size: 14px;
  right: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.1);
}
.error {
  border-left: 2px solid #cf3838;
}
.success {
  border-left: 2px solid #56c928;
}
</style>

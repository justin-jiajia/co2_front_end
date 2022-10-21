<template>
  <div id="liveAlertPlaceholder"></div>
  <form>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">用户名</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        v-model="username.un"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="passwd"
      />
    </div>
    <button type="button" class="btn btn-primary" @click="sumbit">提交</button>
  </form>
</template>
<script>
import { axios } from "../extras/index.js";
import { reactive } from "vue";
import Store from "../store/index.js";
import Router from "../router/index.js";
var alertPlaceholder;
const username = reactive({ un: "" });
export default {
  name: "LoginView",
  mounted() {
    alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  },
  data() {
    return {
      Store,
      username,
      passwd: "",
    };
  },
  methods: {
    sumbit() {
      axios
        .post("/oath/token/", {
          username: this.username.un,
          password: this.passwd,
        })
        .then(function (response) {
          Store.token = response.data.token;
          localStorage.setItem("token", response.data.token);
          Store.un = username.un;
          localStorage.setItem("un", username.un);
          Router.push("/");
        })
        .catch(function (error) {
          var wrapper = document.createElement("div");
          wrapper.innerHTML =
            '<div class="alert alert-danger alert-dismissible" role="alert">' +
            error.response.data.message +
            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

          alertPlaceholder.append(wrapper);
        });
    },
  },
};
</script>

import { reactive } from "vue";
export default reactive({
  token: localStorage.getItem("token"),
  un: localStorage.getItem("un"),
});

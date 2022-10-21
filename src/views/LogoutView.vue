<script>
import Store from "../store/index.js";
export default {
  mounted() {
    localStorage.removeItem("token");
    Store.token = "";
    this.$router.push("/");
  },
};
</script>

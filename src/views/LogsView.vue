<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">时间</th>
        <th scope="col">方式</th>
        <th scope="col">数值</th>
        <th scope="col">单位</th>
        <th scope="col">排放量(克)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="log in data.data.logs" :key="log.id">
        <td>{{ log.timestamp.substring(0, 10) }}</td>
        <td>{{ log.o_type }}</td>
        <td>{{ log.value }}</td>
        <td>{{ log.unit }}</td>
        <td>{{ log.co2_l }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import Store from "../store/index.js";
import { axios } from "../extras/index.js";
import { reactive } from "vue";
const data = reactive({ data: [] });
export default {
  setup() {
    axios
      .get("/log/", { headers: { Authorization: Store.token } })
      .then(function (res) {
        data.data = res.data;
      });
  },
  data() {
    return {
      data,
    };
  },
};
</script>

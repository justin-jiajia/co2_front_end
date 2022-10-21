<template>
  <template v-if="Store.token">
    <div class="row" style="width: 100%">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              你好，{{ Store.un
              }}<small><router-link to="/logout">退出登录</router-link></small>
            </h5>
            <p class="card-text">
              {{ rb() }}<br /><router-link to="/logs">我的排放记录</router-link>
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">积分中心</h5>
            <p class="card-text">
              你的积分：{{ data.data.jf }}
              <br />
              昨日你获得积分：{{ data.data.jf_yesterday }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body" style="width: 100%">
        <h4 class="card-title">我的碳排放</h4>
        <div class="card-text" id="mychart"></div>
      </div>
    </div>
    <br />
    <div class="d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        记录！
      </button>
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">记录碳排放</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="关闭"
            ></button>
          </div>
          <div class="modal-body">
            <label for="hdxz" class="form-label">活动：</label>
            <select
              class="form-select"
              aria-label="选择您的活动"
              v-model="hd"
              id="hdxz"
            >
              <option selected>选择您的活动</option>
              <option :value="i.o_type" v-for="i in tl" :key="i.o_type">
                {{ i.o_type }}
              </option>
            </select>
            <label for="h_mn" class="form-label">长度</label>
            <div class="input-group mb-3">
              <input type="number" class="form-control" v-model="yz" />
              <span class="input-group-text" id="basic-addon2">{{ dw }}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="sumbit"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-if="!Store.token">
    <div class="container rounded-4 py-5 bg-info">
      <h1 class="display-5 fw-bold">欢迎使用！</h1>
      <p class="fs-4">
        欢迎使用一碳到底碳排放记录仪！<br />本应用会以积分的方向鼓励大家减少碳排放
      </p>
      <div class="btn-group" role="group" aria-label="Basic outlined example">
        <router-link to="/sign_up" class="btn btn-outline-primary btn-lg">
          注册
        </router-link>
        <router-link to="/login" class="btn btn-outline-secondary btn-lg">
          登录
        </router-link>
      </div>
    </div>
  </template>
</template>

<script>
import Store from "../store/index.js";
import { sentences as items, tl } from "../zl/index.js";
import { axios, echarts } from "../extras/index.js";
import { reactive } from "vue";
const data = reactive({ data: {} });
var chart;
window.onresize = function () {
  chart && chart.resize();
};
export default {
  name: "HomeView",
  mounted() {
    if (Store.token) {
      chart = echarts.init(document.getElementById("mychart"));
    }
  },
  setup() {
    if (Store.token) {
      axios
        .get("/home/", { headers: { Authorization: Store.token } })
        .then(function (res) {
          data.data = res.data;
          const option = {
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: (function () {
                var x = [];
                for (var i = 0; i < res.data.day_logs.length; i++) {
                  x.push(res.data.day_logs[i].timestamp);
                }
                return x;
              })(),
              axisPointer: { show: true },
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: (function () {
                  var x = [];
                  for (var i = 0; i < res.data.day_logs.length; i++) {
                    x.push(res.data.day_logs[i].value);
                  }
                  return x;
                })(),
                type: "line",
                smooth: true,
              },
            ],
          };
          option && chart.setOption(option);
        });
    }
  },
  data() {
    return {
      Store,
      data,
      tl,
      hd: "",
      dw: "",
      tp: 0,
      yz: 0,
    };
  },
  watch: {
    hd() {
      for (var i = 0; i < tl.length; i++) {
        if (tl[i].o_type == this.hd) {
          this.dw = tl[i].unit;
          this.tp = tl[i].l;
          break;
        }
      }
    },
  },
  methods: {
    rb() {
      var randomItem = items[Math.floor(Math.random() * items.length)];
      return randomItem;
    },
    sumbit() {
      axios
        .post(
          "/log/",
          {
            value: this.yz,
            co2_l: this.yz * this.tp,
            unit: this.dw,
            o_type: this.hd,
          },
          { headers: { Authorization: Store.token } }
        )
        .then(function (res) {
          data.data = res.data;
          const option = {
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: (function () {
                var x = [];
                for (var i = 0; i < res.data.day_logs.length; i++) {
                  x.push(res.data.day_logs[i].timestamp);
                }
                return x;
              })(),
              axisPointer: { show: true },
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: (function () {
                  var x = [];
                  for (var i = 0; i < res.data.day_logs.length; i++) {
                    x.push(res.data.day_logs[i].value);
                  }
                  return x;
                })(),
                type: "line",
                smooth: true,
              },
            ],
          };
          option && chart.setOption(option);
        });
    },
  },
};
</script>
<style>
#mychart {
  width: 100%;
  height: 380px;
}
</style>

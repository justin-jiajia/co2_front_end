import axios from "axios";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
axios.defaults.baseURL = "https://co2.api.hijiajia.xyz/api_v1/";
export { axios, echarts };

import Taro from "@tarojs/taro";

import "./app.scss";

const App = {
  mounted() {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init({
        env: "wechat-6grho4pj764f1377",
      });
    }
  },
  onShow(options) {},
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h("block", this.$slots.default);
  },
};

export default App;

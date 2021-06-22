export default {
  pages: [
    "pages/my/index",
    "pages/home/index",
    "pages/bill/index",
    "pages/clockIn/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "./assets/image/tabBar/home.png",
        selectedIconPath: "./assets/image/tabBar/home-active.png"
      },
      {
        pagePath: "pages/bill/index",
        text: "记账本",
        iconPath: "./assets/image/tabBar/bill.png",
        selectedIconPath: "./assets/image/tabBar/bill-active.png"
      },
      {
        pagePath: "pages/clockIn/index",
        text: "打卡",
        iconPath: "./assets/image/tabBar/clockIn.png",
        selectedIconPath: "./assets/image/tabBar/clockIn-active.png"
      },
      {
        pagePath: "pages/my/index",
        text: "我的",
        iconPath: "./assets/image/tabBar/my.png",
        selectedIconPath: "./assets/image/tabBar/my-active.png"
      }
    ],
    position: "bottom",
    custom: false
  },
  cloud: true
};

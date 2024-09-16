export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/nodes/index',
    'pages/hot/index',
    'pages/node_detail/index',
    'pages/thread_detail/thread_detail',
  ],
  tabBar: {
    list: [
      {
        iconPath: './resource/latest.png',
        selectedIconPath: 'resource/lastest_on.png',
        pagePath: 'pages/index/index',
        text: 'Last',
      },
      {
        iconPath: 'resource/hotest.png',
        selectedIconPath: 'resource/hotest_on.png',
        pagePath: 'pages/hot/index',
        text: 'Hot',
      },
      {
        iconPath: 'resource/node.png',
        selectedIconPath: 'resource/node_on.png',
        pagePath: 'pages/nodes/index',
        text: 'Nodes',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});

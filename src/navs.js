// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];
const autoGenAsideNavs = [
  {
    text: '币市新闻',
    to: '/marketInfo',
    icon: 'horn',
    children: [{ text: '金色新闻', to: '/marketInfo/jinseNews' }],
  },
];

// <!-- auto generated navs end -->

const customHeaderNavs = [
  // {
  //   text: '首页',
  //   to: '/',
  //   icon: 'home',
  // },
  // {
  //   text: '反馈',
  //   to: 'https://github.com/alibaba/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'message',
  // },
  // {
  //   text: '帮助',
  //   to: 'https://alibaba.github.io/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'bangzhu',
  // },
];


const customAsideNavs = [{
    text: '财富纵横',
    to: '/',
    icon: 'home',
  },
  {
    text: '订单管理',
    to: '/post',
    icon: 'copy',
    children: [
      { text: '订单列表', to: '/post/list' },
      { text: '买卖收益', to: '/post/buyAndSell' },
    ],
  },
  {
    text: '决策管理',
    to: '/strategy',
    icon: 'yonghu',
    children: [
      { text: '决策列表', to: '/strategy/list' },
      { text: '水位监控', to: '/strategy/waterLevelMonitor' },
      { text: '添加监控', to: '/strategy/create' },
      { text: '微信监控', to: '/strategy/wxWaterLevelMonitor' },
    ],
  },
  {
    text: '通用设置',
    to: '/setting',
    icon: 'shezhi',
    children: [
      { text: '基础设置', to: '/setting/basic' },
      {
        text: '菜单设置',
        to: '/setting/navigation',
      },
    ],
  },
];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...customHeaderNavs,
  ...autoGenHeaderNavs,
]);

export const asideNavs = transform([...customAsideNavs, ...autoGenAsideNavs]);

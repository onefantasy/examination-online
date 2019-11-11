import Vue from 'vue'
import App from './App.vue'

// 导入路由
import router from './router'

// 导入仓库
import store from './store'

// 安装toast插件
import toast from 'components/common/toast'
Vue.use(toast)

// 引入自定义主题的element
import 'assets/theme/index.css'
import {
  Button,
  Image,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Checkbox,
  Loading,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  // element 隐藏的组件，滚动条
  Scrollbar,
  Avatar,
} from 'element-ui'
Vue.use(Button)
Vue.use(Image)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(Loading)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Scrollbar)
Vue.use(Avatar)

// 开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。(摘于官网说明) 大概意思应该就是，消息提示的环境配置，设置为开发环境或者生产环境
// Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

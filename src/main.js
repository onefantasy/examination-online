import Vue from 'vue'
import App from './App.vue'

// 导入路由
import router from './router'

// 安装toast插件
import toast from 'components/common/toast'
Vue.use(toast);

import {Button,Image,Form,FormItem,Input} from 'element-ui'
Vue.use(Button);
Vue.use(Image);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');

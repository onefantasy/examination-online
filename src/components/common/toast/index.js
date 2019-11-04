import Toast from './Toast'

const obj = {};

// 使用install时，需要传入一个vue
obj.install = function(Vue){
  // 1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // 2. 创建出一个组件构造器的实例
  const toast = new toastContrustor();

  // 3.将组件挂载到某一个对象上
  toast.$mount(document.createElement('div'));

  // 4.toast.$el对应的就是div
  document.body.append(toast.$el);
  Vue.prototype.$toast = toast;
};

export default obj;

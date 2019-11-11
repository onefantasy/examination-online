<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
  import db from 'common/db'
  import { mapActions } from 'vuex'

  export default {
    name: 'app',
    beforeCreate:async function(){
      /* if(!db.getLocalStorage('account') || !db.getLocalStorage('password')){
        // 如果本地不存在用户的信息缓存，则跳转到登录页面
        this.$router.push('/')
      } else {
        // 注意：
        // 设置定时器等待vuex初始化完成，才能写入数据
        // 使用await阻止进行下个页面的操作，因为用户的账号信息还没存入仓库，无法获取
        await setTimeout(()=>{})
        this.setUser({
          account: db.getLocalStorage('account'),
          password: db.getLocalStorage('password'),
          status: db.getLocalStorage('status')
        })
      } */
    },
    methods:{
      ...mapActions([
        'setUser'
      ]),
    },
    components: {

    }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>

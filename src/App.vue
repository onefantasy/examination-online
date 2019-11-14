<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view v-if="!isRefresh"></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
  import db from 'common/db'
  import { mapActions } from 'vuex'

  export default {
    // 传递给所有子组件的方法
    provide(){
      return {
        reload: this.reload   // 刷新页面的方法
      }
    },
    name: 'app',
    data(){
      return {
        // 是否刷新router-view页面的变量
        // 本质就是v-if来重新渲染页面
        isRefresh: false   
      }
    },
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
      // 刷新页面的方法
      reload(){
        this.isRefresh = true   // 刷新
        this.$nextTick(function(){
          this.isRefresh = false  // 刷新之后就展示
        })
      }
    },
    components: {

    }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>

<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view v-if="!isRefresh"></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
  import db from 'common/db'
  import { mapGetters } from 'vuex'

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
    computed:{
      ...mapGetters([
        'getUser'
      ]),
    },
    beforeCreate:async function(){
      // 如果存在sessionStorage，说明是，进行了刷新操作，则进行获取
      await setTimeout(()=>{})
      const data = window.sessionStorage.getItem('store')
      console.log('sessionStorage读取结果:',data)
      if(data) this.$store.commit('user/SET_INFO',JSON.parse(data))

      // 在页面刷新前设置sessionStorage，通过注册监听事件执行相应的代码
      window.addEventListener('beforeunload',()=>{
        const data = {
          account: this.getUser.account,
          password: this.getUser.password
        }
        console.log('sessionStorage设置结果：',data)
        window.sessionStorage.setItem('store',JSON.stringify(data))
      })
    },
    methods:{
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

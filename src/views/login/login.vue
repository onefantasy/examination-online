<template>
  <div class="login">

    <div class="scanning">在线考试系统</div>

    <div class="box register-box" :class="{shuffleCards:currentTab === 1}">
      <register-form @complete="changeTab(2)"/>
    </div>
    <!--<div class="box forget-box" :class="{shuffleCards:currentTab === 3}">忘记密码</div>-->
    <div class="box login-box" :class="{shuffleCards:currentTab === 2}">
      <login-form />
    </div>

    <div class="guide">
      <div class="guide-item" @click="changeTab(1)">注册</div>
      <div class="guide-item" @click="changeTab(2)">登录</div>
      <!--<div class="guide-item" @click="changeTab(3)">忘记密码</div>-->
    </div>
  </div>
</template>

<script>
  import loginForm from './children/loginForm'
  import registerForm from './children/registerForm'
  import { mapActions } from 'vuex'

  export default {
    name: "login",
    data() {
      return {
        currentTab: 2,
      };
    },
    beforeCreate(){
      // 一旦进入登录页面，就清除sessionStorage，避免对下次登陆造成干扰
      window.sessionStorage.removeItem('store')
      window.sessionStorage.removeItem('token')
    },
    methods: {
      ...mapActions([
        'setUser'
      ]),
      // 更改显示的表单
      changeTab(index){
        this.currentTab = index;
      }
    },
    components: {
      loginForm,
      registerForm,
    },
  }
</script>

<style scoped>
  .login {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: #EDEDED;
  }
  .guide{
    position: fixed;
    width: 250px;
    height: 270px;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: var(--color-white);
    z-index: 10;
  }

  .guide-item{
    float: right;
    margin: 20px 0;
    cursor: pointer;
    animation: push .8s ease;
    animation-fill-mode: forwards;
    background-color: var(--color-main);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.6);
    border-radius: 10px 0 0 10px;
  }

  .guide-item:hover{
    animation: pull .8s ease;
    animation-fill-mode: forwards;
  }

  @keyframes pull {
    from{
      width: 15vw;
    }
    to{
      width: 18vw;
    }
  }

  @keyframes push {
    from{
      width: 18vw;
    }
    to{
      width: 15vw;
    }
  }

  .box{
    width: 400px;
    height: 500px;
    background-color: var(--color-main);
    box-shadow: 5px 5px 5px 0 rgba(0,0,0,.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    z-index: 1;
  }

  .shuffleCards{
    animation: shuffleCards 1.5s ease;
    animation-fill-mode: forwards;
  }

  @keyframes shuffleCards {
    0%{
      transform: translate(-50%,-50%);
      z-index: 0;
    }
    50%{
      transform: translate(-160%,-50%);
      z-index: 0;
    }
    100%{
      transform: translate(-50%,-50%);
      z-index: 10;
    }
  }

  .scanning{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#ccc,#aaa),
    linear-gradient(90deg, #ffffff33 1px,transparent 0,transparent 19px),
    linear-gradient(#ffffff33 1px,transparent 0,transparent 19px),
    linear-gradient(transparent, #999);
    background-size:100% 1.5%, 10% 100%,100% 10%, 100% 100%;
    background-repeat: no-repeat,repeat,repeat,no-repeat;
    background-position: 0 0,0 0, 0 0, 0 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 1.5%, 0% 1.5%);
    animation: move 3s linear;
    animation-fill-mode: forwards;

    text-align: center;
    line-height: 100px;
    font-size: 40px;
    color: var(--color-black);
    font-weight: 700;
  }
  @keyframes move {
    100% {
      background-position: 0 100%, 0 0, 0 0, 0 0;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    }
  }
</style>

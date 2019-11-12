<template>
  <div class="error-box">
    <div class="error-title">404 NOT FOUND</div>
    <div>是不是觉得画风不对？</div>
    <div>因为你走错路了</div>
    <div>天若有情天亦老，人间正道是沧桑</div>
    <div @click="goLogin" class="login-link">点我返回登陆页面吧</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods:{
      goLogin(){
        // 跳转到登陆页面
        this.$router.push('/login')
      }
    },
    components:{
    }
}
</script>

<style scoped>
  .error-box{
    text-align: center;
    font-family: 'KaiTi','Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 15px;
  }

  .error-title{
    font-size: 40px;
    line-height: 200px;
  }

  .login-link{
    width: 200px;
    margin: 50px auto;
    cursor: pointer;
    font-size: 20px;
    color: purple;
    font-size: 700;
  }

  .login-link:hover{
    text-decoration: underline;
  }
</style>

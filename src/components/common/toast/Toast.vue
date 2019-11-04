<template>
  <div class="toast-box" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false,
      };
    },
    methods: {
      showToast(message='默认文字',delay=1000){
        this.message = message;
        this.isShow = true;
        setTimeout(()=>{
          this.message = '';
          this.isShow = false;
        },delay);
      }
    },
    components: {},
  }
</script>

<style scoped>

  .toast-box{
    line-height: 30px;
    background-color: rgba(0,0,0,.7);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    font-size: 15px;
    text-align: center;
    padding: 8px 10px;
    z-index: 100;
    border-radius: 8px;
  }
</style>

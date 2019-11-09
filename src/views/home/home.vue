<template>
  <div class="home-box">
    <h2>我是主页</h2>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "home",
    data() {
      return {};
    },
    computed:{
      ...mapGetters([
        'getUser'
      ]),
    },
    methods: {
    },
    created(){
      console.log('用户的账号信息:',JSON.stringify(this.getUser))
    },
    components: {},
  }
</script>

<style scoped>
  .home-box{
    position: absolute;
  }
</style>

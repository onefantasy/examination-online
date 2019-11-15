<template>
  <div class="topBanner-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>在线考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>{{titles[titleIndex]}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 退出登录按钮 -->
    <el-button type="primary" class="logout" @click="logout">退出</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        titles: {
          '/home/welcome':'首页',
          '/home/paper':'我的试卷',
          '/home/exam':'考试',
          '/home/grade':'成绩统计',
          '/home/user':'个人信息',
          '/home/topic':'出卷'
        }
      }
    },
    computed:{
      titleIndex(){
        return this.$route.fullPath
      },
    },
    methods:{
      // 退出登录
      logout(){
        
      }
    },
    components:{
    }
}
</script>

<style>
  .topBanner-box .el-breadcrumb{
    line-height: 68px;
    padding-left: 20px;
    font-size: 15px;
    width: 50%;
  }
  .topBanner-box .el-breadcrumb__inner{
    color: var(--color-white) !important;
  }
</style>

<style scoped>
  .topBanner-box{
    height: 68px;
    width: 100%;
    background-color: var(--color-main);
    border-bottom: 5px solid var(--color-minor);
    position: relative;
  }

  .logout{
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
</style>

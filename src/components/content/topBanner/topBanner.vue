<template>
  <div class="topBanner-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>在线考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>{{titles[titleIndex]}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='button-box'>
      <!-- 刷新按钮 -->
      <el-button type="success" @click="refresh">刷新</el-button>
      <!-- 退出登录按钮 -->
      <el-button type="primary" @click="logout">退出</el-button>
    </div>
  </div>
</template>

<script>
  import db from 'common/db.js'

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
    inject:['reload'],
    computed:{
      // 找出当前页面的索引值
      titleIndex(){
        return this.$route.fullPath
      },
    },
    methods:{
      // 退出登录
      logout(){
        this.$message.confirm('确定要退出当前登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 删除本地的缓存
          db.delLocalStorage('account')
          db.delLocalStorage('password')
          // 跳转到登陆页面
          this.$router.push('/')
        }).catch(() => {
          this.$notify({
            title: '退出',
            message: '取消退出',
            type: 'info'
          })
        })
      },
      // 刷新页面
      refresh(){
        // this.reload()
        this.$router.go(0)
        /* this.$notify({
          title: '刷新',
          message: '刷新页面成功',
          type: 'success'
        }) */
        console.log('页面已经刷新')
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

  .button-box{
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
</style>

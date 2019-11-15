<template>
  <div class="mainMenu-box">
    <div class="user-info">
      <el-avatar :size='80' :src="headImg"></el-avatar>
      <div class="user-carceer">{{carceer}}</div>
      <div class="user-welcome">~~欢迎您~~</div>
      <div class="user-name">{{name || account || '无名'}}</div>
    </div>
    <div class="mainMenu">
      <el-scrollbar style="height:100%">
        <el-menu
          :default-active="currentPage"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select='handleSelect'
        >
          <el-menu-item index="0">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="1">
            <i class="el-icon-folder"></i>
            <span>我的试卷</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-edit-outline"></i>
            <span>考试</span>
          </el-menu-item>
          <el-menu-item index="3">
              <i class="el-icon-s-data"></i>
              <span>成绩统计</span>
            </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="5" v-if="carceerTag === 'T'">
            <i class="el-icon-edit"></i>
            <span slot="title">出卷</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
      }
    },
    props:{
      headIcon:{
        type: String,
        // 默认头像
        // default: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        default: ''
      },
      carceerTag:{
        // 确定职业的标志，一般是 T 或者 S
        type: String,
        default: ''
      },
      name:{
        // 用户名称
        type: String,
        default: ''
      },
      account:{
        // 用户账号
        type: String,
        default: ''
      }
    },
    computed:{
      ...mapGetters([
        'getUser'
      ]),
      carceer(){
        // 确定职业
        let carceer = ''
        switch(this.carceerTag){
          case 'T':
            carceer = '教师'
            break
          case 'S':
            carceer = '学生'
            break
          default:
            carceer = '职业不明'
        }
        return carceer
      },
      currentPage(){
        // 根据路径确定当前的子页面
        const arr = [
          '/home/welcome',
          '/home/paper',
          '/home/exam',
          '/home/grade',
          '/home/user',
          '/home/topic'
        ]
        return arr.indexOf(this.$route.fullPath) + ''
      },
      headImg(){
        // 确定头像的图片
        if(!this.headIcon) return 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        return this.headIcon
      }
    },
    methods:{
      // 点击菜单的选项
      handleSelect(index){
        console.log('点击菜单的选项：',index)
        // 告诉父组件已经选中的功能
        this.$emit('selected',index)
      },
    },
    components:{
    }
 }
</script>

<style>
/* 区域滚动,禁止x轴滚动，隐藏x轴的滚动条 */
  .mainMenu .el-scrollbar__wrap{
      overflow-x: hidden;
  }
</style>

<style scoped>
  .mainMenu-box{
    position: relative;
    background-color: var(--color-main);
    height: 100vh;
    overflow: hidden;
    border-right: 5px solid var(--color-minor);
    box-sizing: border-box;
  }

  .mainMenu{
    position: absolute;
    right: -3px;
    left: 0;
    bottom: 0;
    top: 25%;
  }

  /* 用户信息 开始 */
  .user-info{
    height: 25%;
    border-bottom: 1px solid var(--color-minor);
    text-align: center;
    padding-top: 20px;
    color: var(--color-white);
  }
  .user-carceer{
    font-size: 13px;
    line-height: 30px;
  }
  .user-name{
    font-size: 20px;
    line-height: 40px;
  }
  .user-welcome{
    font-size: 10px;
    color: var(--color-minor);
  }
  /* 用户信息 结束 */
</style>


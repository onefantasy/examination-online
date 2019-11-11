<template>
  <div class="home-box">
    <el-row>
      <el-col :span='3'>
        <!-- 主菜单的内容 -->
        <mainMenu @selected='menuSelect'/>
      </el-col>
      <el-col :span='21'>
        <div class='home-content'>
          <el-scrollbar syle='height: 100%'>
            <!-- 页面子路由 -->
            <!-- 此处加个div的原因：
                  1. 解决替换router-view的子页面没有class（原因未明，估计是el-scrollbar的原因）
                  2. 设定所有子页面的高度
             -->
            <div class="router-view">
              <router-view></router-view>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import mainMenu from 'components/content/mainMenu'

  import { mapGetters } from 'vuex'

  export default {
    name: "home",
    data() {
      return {
        // 子页面的全部路由
        routers:[
          '/home/welcome',
          '/home/paper',
          '/home/exam',
          '/home/grade',
          '/home/user',
          '/home/topic'
        ]
      };
    },
    computed:{
      ...mapGetters([
        'getUser'
      ]),
    },
    methods: {
      // 处理主菜单中的选中事件
      menuSelect(index){
        console.log('home中接收的菜单事件：',typeof index)
        // 跳转子页面
        this.$router.push(this.routers[index])
      }
    },
    created(){
      console.log('用户的账号信息:',JSON.stringify(this.getUser))
    },
    components: {
      mainMenu,
    },
  }
</script>

<style>
/* 区域滚动,禁止x轴滚动，隐藏x轴的滚动条 */
  .home-content .el-scrollbar__wrap{
      overflow-x: hidden;
  }
</style>

<style scoped>
  .home-box{
    position: absolute;
    width: 100%;
  }

  .home-content{
    height: 100vh;
  }

  .router-view{
    height: 100vh;
  }
</style>

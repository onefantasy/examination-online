<template>
  <div class="home-box">
    <el-row>
      <el-col :span='3'>
        <!-- 主菜单的内容 -->
        <mainMenu @selected='menuSelect' :carceerTag='getUser.status' :name='getUser.name' :headIcon='getUser.headIcon' :account='getUser.account' v-if="!isRefreshMainMenu"/>
      </el-col>
      <el-col :span="21">
        <!-- 顶部导航栏 -->
        <topBanner />
        <!-- 主页的内容部分 -->
        <div class="home-content">
          <el-scrollbar class="content-srcollbar">
            <!-- 页面子路由 -->
            <!-- 此处加个div的原因：
                  1. 解决替换router-view的子页面没有class（原因未明，估计是el-scrollbar的原因）
                  2. 设定所有子页面的高度
             -->
            <div>
              <router-view></router-view>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import mainMenu from 'components/content/mainMenu/mainMenu'
  import topBanner from 'components/content/topBanner/topBanner'

  import { mapGetters,mapActions } from 'vuex'
  import { getUserInfo } from 'network/user'

  export default {
    name: "home",
    provide(){
      return {
        // 刷新mainMenu的方法，参考App.vue下的reload方法
        refreshMainMenu: this.refreshMainMenu
      }
    },
    data() {
      return {
        routers:[
          '/home/welcome',
          '/home/paper',
          '/home/exam',
          '/home/grade',
          '/home/user',
          '/home/topic'
        ],
        // 是否刷新mainMenu的标志
        isRefreshMainMenu: false,
      }
    },
    computed:{
      ...mapGetters([
        'getUser'
      ]),
    },
    methods: {
      ...mapActions([
        'setUser'
      ]),
      // 处理主菜单中的选中事件
      menuSelect(index){
        // 跳转子页面
        this.$router.push(this.routers[index])
      },
      // 刷新mainMenu
      refreshMainMenu(){
        this.isRefreshMainMenu = true   // 刷新
        this.$nextTick(function(){
          this.isRefreshMainMenu = false  // 刷新之后就展示
        })
      }
    },
    created(){
      // 请求用户信息的加载提示
      const loading = this.$loading({
        lock: true,
        text: '获取信息中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 请求用户的详细信息
      getUserInfo(this.getUser).then(res => {
        // 关闭加载提示
        loading.close()

        if(!res.data.isGet) {
          this.$toast.showToast(res.data.description || '请求失败')
        }
        else {
          this.setUser(res.data.data)
          console.log('用户的完整信息：',this.getUser)
        }
      },err => {
        this.$toast.showToast('请求出错，请稍后重试')
      })
    },
    components: {
      mainMenu,
      topBanner,
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
    height: calc(100vh - 68px);
    /* background-color: var(--color-background); */
  }

  .content-srcollbar{
    height: calc(100vh - 68px);
  }
</style>

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
            <!-- 
              此处加个div的原因：
                1. 解决替换router-view的子页面没有class（原因未明，估计是el-scrollbar的原因）
                2. 设定所有子页面的高度
             -->
            <div>
              <transition name="fade-transform" mode="out-in">
                <router-view v-if="!isrefreshHomeContent"></router-view>
              </transition>
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

  import { mapGetters } from 'vuex'

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
        // 是否刷新home-content的标志
        isrefreshHomeContent: false
      }
    },
    computed:{
      ...mapGetters([
        'getUser'
      ]),
    },
    watch:{
      'getUser':{
        handler(){
          // 判断用户是否已经将必须的信息填写完成
          if(this.getUser.name && this.getUser.school && this.getUser.class && this.getUser.number){
            this.$store.commit('user/SET_INFO',{isComplete:true})
          } else {
            this.$store.commit('user/SET_INFO',{isComplete:false})
          } 
        },
        deep: true
      }
    },
    methods: {
      // 处理主菜单中的选中事件
      menuSelect(index){
        let flag = true
        if([1,2,3,5].indexOf(+index) !== -1){
          // 判断是否改用户是否已经将用户信息填写完整
          if(!this.getUser.isComplete){
            flag = false
            this.$message.alert('您的必填信息尚未填写完整，请前往个人信息模块将必须的信息填写完整，之后才能使用本功能!','用户信息不完整',{
              confirmButtonText: '填写信息',
              callback: action => {
                // window.location.href = '/home/user'
                this.$router.push('/home/user')
              }
            })
          }
        }
        // 跳转子页面
        flag && this.$router.push(this.routers[index])
      },
      // 刷新mainMenu
      refreshMainMenu(){
        this.isRefreshMainMenu = true   // 刷新
        this.$nextTick(function(){
          this.isRefreshMainMenu = false  // 刷新之后就展示
        })
      },
      // 刷新home-content
      refreshHomeContent(){
        this.isrefreshHomeContent = true // 刷新
        this.$nextTick(function(){
          this.isrefreshHomeContent = false // 刷新之后就开始展示
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
      this.$store.dispatch('user/getInfo',this.getUser).then(res => {
        // 关闭加载提示
        loading.close()
        res.data.errcode === 0 || this.$toast.showToast(res.data.message || '请求失败')
        this.refreshHomeContent()
      }).catch(err => {
        loading.close()
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

  /* 路由切换特效 */
  /* fade */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.28s;
  }
  
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  
  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .5s;
  }
  
  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  
  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
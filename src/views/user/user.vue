<template>
<!-- 个人信息 -->
  <div class="p20 user-box">
    <el-card shadow="hover">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="form.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-select v-model="form.status" placeholder="职业" disabled>
            <el-option label="教师" value="T"></el-option>
            <el-option label="学生" value="S"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学校">
          <el-input v-model="form.school" clearable placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.class" clearable placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" clearable placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.number" clearable placeholder="学号或教师编号(必填)"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" type="number" max="120" min="0"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8082/image/saveImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept=".jpg"
            :data="{account:form.account,type:'headIcon'}"
            :with-credentials="true"
            :headers="{'token':token}"
          >
            <div @click="showImgTip">
              <img v-if="form.headIcon" :src="form.headIcon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="cancel">撤销</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters,mapActions } from 'vuex'
  import { setUserInfo } from 'network/user'

  export default {
    data() {
      return {
        form: {
          account: '',  // 账号
          status: '',  // 职业
          school: '',   // 所在学校
          class: '',    // 班级
          name: '',   // 用户姓名
          number: '',   // 编号，学号或者教师编号
          sex: '',    // 性别
          age: 0,  // 年龄
          headIcon: ''   // 头像图片的路径
        },
        token: window.sessionStorage.getItem('token'),
      }
    },

    computed:{
      ...mapGetters([
        'getUser'
      ]),
    },

    watch:{
      "form.age"() {
        // 监听输入的年龄的值，防止出现超出正常年龄范围
        this.form.age < 0 && (this.form.age = 0)
        this.form.age > 120 && (this.form.age = 120)
      },
      "getUser":{
        // 将仓库中的用户信息传递给form
        // 因为在home中进行数据请求是异步的，有时 不一定能够在created中获取到想要的数据
        // 所以需要进行监听，及时更新数据
        handler(){
          Object.assign(this.form,this.getUser)
        },
        deep: true
      }
    },

    created(){
      // 将仓库中的用户信息传递给form
      // 因为 有时 直接使用缓存或者网络响应够快，在创建这个页面之前已经获取到用户的数据
      // 所以，在监听不到getUser的变化,需要这个生命周期中进行赋值
      Object.assign(this.form,this.getUser)
    },

    methods: {
      ...mapActions([
        'setUser'
      ]),
      onSubmit(){
        // 保存用户信息的提示
        const loading = this.$loading({
          lock: true,
          text: '保存中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        // 提交表单数据
        setUserInfo(this.form)
        .then((res) => {
          loading.close()
          if(res.data.isSet) {
            // 数据保存的成功的提示
            this.$notify({
              title: '保存',
              message: '个人信息保存成功',
              type: 'success'
            })
            // 同步更新仓库的个人用户信息
            this.setUser(this.form)
          } else {
            this.$notify({
              titil: '保存',
              message: res.data.description || '请求出错',
              type: 'warning'
            })
          } 
        })
        .catch( err => {
          this.$notify.error({
            title: '保存',
            message: '网络请求出错，请稍后重试'
          })
        })
      },
      handleAvatarSuccess(res, file) {
        // 设置token 或者 刷新token
        console.log('保存图片时更新的token：',res.token)
        !!res.token && window.sessionStorage.setItem('token',res.token)
        this.token = res.token

        // 处理选择作为头像的图片
        if (!res.fileUrl) {
          this.$notify.error({
            title: '图片',
            message: '图片上传失败，请稍后重试'
          })
          return false
        }
        // 在图片地址添加没有任何影响的随机数，用于更新图片
        // 因为图片改变之后，地址也没有任何变化，所以浏览器不会进行重新加载图片，导致新图片无法及时展示出来
        // 所以需要加上随机数，让浏览器以为是另一张图片，进行重新加载
        const temporary = res.fileUrl + `?t=${Math.random()/1000}`
        this.form.headIcon = temporary

        // 头像设置成功的提示
        this.$notify({
          title: '图片',
          message: '图片上传成功，已更新头像',
          type: 'success'
        })

        // 将图片地址传入仓库
        this.setUser({headIcon:temporary})
      },
      beforeAvatarUpload(file) {
        // 判断所选择的图片是否符合要求
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          // this.$message.error('上传头像图片只能是 JPG 格式!')
          this.$notify.error({
            title: '图片',
            message: '上传头像图片只能是 JPG 格式!'
          })
        }
        if (!isLt2M) {
          // this.$message.error('上传头像图片大小不能超过 2MB!')
          this.$notify.error({
            title: '图片',
            message: '上传头像图片大小不能超过 2MB!'
          })
        }

        return isJPG && isLt2M
        // return false
      },
      showImgTip(){
        // 选择头像时的提示
        this.$notify({
          title: '图片',
          message: '请使用宽高相等的图片,或者是宽大于高的图片作为头像,那样会有更好的展示效果,上传头像图片大小不能超过 2MB!',
          type: 'warning'
        })
      },
      // 取消修改的内容
      cancel(){
        this.$message.confirm('此操作将放弃已修改的内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 撤销修改，重置数据
          Object.assign(this.form,this.getUser)
          this.$notify({
            title: '撤销',
            type: 'success',
            message: '撤销修改成功!'
          });
        }).catch(() => {
          this.$notify({
            title: '撤销',
            type: 'info',
            message: '不进行撤销'
          });
        });
      }
    },

    components:{
    },

    beforeDestroy(){
      // 销毁页面之前，关闭所有的通知
      this.$notify.closeAll()
    }
}
</script>


<style>
  /* 头像图片选择框 开始 */
  .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9 !important;
    border-radius: 6px !important;
    cursor: pointer !important;
    position: relative !important;
    overflow: hidden !important;
  }
  .avatar-uploader .el-upload:hover {
    border-color: var(--color-minor);
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /* 头像图片选择框 结束 */
</style>

<style scoped>
  .p20 .el-card{
    width: 50%;
    margin: 0 auto;
  }
</style>

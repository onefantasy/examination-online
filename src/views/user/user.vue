<template>
<!-- 个人信息 -->
  <div class="p20">
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
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" type="number" max="120" min="0"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept=".jpg"
            >
            <div @click="showImgTip">
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          account: 't123456789',  // 账号
          status: 'T',  // 职业
          school: '',   // 所在学校
          class: '',    // 班级
          name: '',   // 用户姓名
          number: '',   // 编号，学号或者教师编号
          sex: '',    // 性别
          age: 0,  // 年龄
          imageUrl: ''   // 头像图片的路径
        }
      }
    },

    watch:{
      "form.age":function () {
        // 监听输入的年龄的值，防止出现超出正常年龄范围
        this.form.age < 0 && (this.form.age = 0)
        this.form.age > 120 && (this.form.age = 120)
      }
    },

    created(){
      this.$notify({
        title: '提示',
        message: '请将所有必填项目填写完整后保存，才能使用本系统的功能。',
        type: 'warning'
      })
    },

    methods: {
      onSubmit() {
        console.log('submit!')
      },
      handleAvatarSuccess(res, file) {
        // 处理选择作为头像的图片
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        // 判断所选择的图片是否符合要求
        console.log('上传图片的信息：',file)
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      showImgTip(){
        // 选择头像时的提示
        this.$notify({
          title: '提示',
          message: '请使用宽高相等的图片,或者是宽大于高的图片作为头像,那样会有更好的展示效果',
          type: 'warning'
        })
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

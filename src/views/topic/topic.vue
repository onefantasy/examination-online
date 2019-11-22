<template>
<!-- 出卷 -->
  <div class="p20 topic-box">
    <!-- 卡片 -->
    <el-card class="card-box">
      <!-- 卡片名称 -->
      <div slot="header">
        <span>试卷信息</span>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="form" label-width="80px" label-position="left"> 
        <!-- 出卷人 -->
        <el-form-item label="出卷人">
          <el-input v-model="form.topicMaker" disabled placeholder="出卷人名字或者账号"></el-input>
        </el-form-item>
        <!-- 出卷人所属的学校 -->
        <el-form-item label="学校">
          <el-input v-model="form.school" disabled placeholder="出卷人所属的学校"></el-input>
        </el-form-item>
        <!-- 试卷标题名称 -->
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="试卷标题名称"></el-input>
        </el-form-item>
        <!-- 科目 -->
        <el-form-item label="科目">
          <el-input v-model="form.subject" placeholder="试卷所考察的科目"></el-input>
        </el-form-item>
        <!-- 时间规定类型 -->
        <el-form-item label="时间规定">
          <el-radio v-model="form.timeType" label="1">统一考试</el-radio>
          <el-radio v-model="form.timeType" lable="2">限期考试</el-radio>
        </el-form-item>
        <!-- 开始时间 -->
        <el-form-item label="开始时间">
          
        </el-form-item>
      </el-form>
    </el-card>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        form: {
          topicMaker: '', // 出卷人
          school: '', // 出卷人所属的学校
          title: '',
          subject: '',
          timeType: 1, //时间的确定的类型，是统一考试还是在规定期限前考完即可
          timeStart: '', // 开始时间或者是日期
          timeEnd: '',  // 结束时间或者是日期
          
        }
      }
    },
    computed:{
      ...mapGetters([
        'getUser'
      ]),
    },
    mounted(){
      // 将出卷人与出卷人所属的学校填写完整且不可更改
      this.$set(this.form,'topicMaker',this.getUser.name || this.getUser.account)
      this.$set(this.form,'school',this.getUser.school)
    },
    methods:{
    },
    components:{
    }
}
</script>

<style scoped>
  .card-box{
    width: 50%;
    margin: 0 auto;
  }
</style>

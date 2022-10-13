<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登入账户设置" name="first">
            <el-form ref="form" label-width="80px" :model="accountInfo" :rules="Rules">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="accountInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="accountInfo.password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情" name="second">
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane lazy label="岗位信息" name="third">
            <job-Info></job-Info>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>

</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user.js'
import jobInfo from '@/views/employees/components/job-info.vue'
import userInfo from '@/views/employees/components/user-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    jobInfo,
    userInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      Rules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入员工密码', trigger: 'blur' },
          { min: 6, message: '密码长度最小6位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    async loadEmployeesInfo() {
      const res = await getUserDetailById(this.$route.params.id)
      this.accountInfo = res
    },
    // 更新用户信息
    async updateEmployees() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.accountInfo)
        this.$message.success('更新成功')
      } catch (error) {
        console.log('false')
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }

}
</script>

<style>

</style>

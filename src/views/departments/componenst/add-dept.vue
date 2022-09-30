<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDeptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <el-option label="username11" value="username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
export default {
  name: 'HrsaasAddDept',
  // 通过属性控制组件显隐
  // 父子 子到父用.sync 在关闭弹窗的时候update:showDialog
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // 部门编码 在整个模块中都不允许重复
    // 拿到所有的编码一个个比对过去，如果出现重复校验不通过，否则通过
    const codeCheck = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments()
      console.log(depts)
      const isRepeat = depts.some(ele => ele.code === value)
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    // 部门名称 同级部门中禁止出现重复部门
    // 重点是同级部门
    const nameCheck = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments()
      console.log(deptstj)
      const deptstj = depts.filter(ele => ele.pid === this.treeNode.id).some(ele => ele.name === value)
      deptstj ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }

        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          { validator: codeCheck, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人必填' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1-300个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      //   清空表格中的数据通过表格自带的方法
      this.$refs.addDeptForm.resetFields()
    }

  }
}
</script>

<style>

</style>

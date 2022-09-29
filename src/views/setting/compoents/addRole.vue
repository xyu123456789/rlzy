<template>
  <div>
    <template>
      <el-dialog
        :title="title"
        width="50%"
        :visible.sync="dialogVisible"
        :before-close=" handleClose"
      >
        <el-form
          ref="roleDialogForm"
          label-width="80px"
          :model="formData"
        >
          <el-form-item
            prop="name"
            label="角色"
            :rules="[{
              required :true,
              message:'角色必填',
              trigger:'blur'
            }]"
          >
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="formData.description" type="textarea" row="3" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="submit">确 定</el-button>
        </el-row>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { addRole, updateRole } from '@/api/seeting'
export default {
  name: 'HrsaasAddRole',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''

      },
      loading: false
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    handleClose() {
      // 表单效果重置
      this.$refs.roleDialogForm.resetFields()
      // 父子间传值
      this.$emit('update:dialog-visible', false)
      this.formData = {
        name: '',
        description: ''
      }
    },
    async submit() {
      try {
        this.loading = true
        await this.$refs.roleDialogForm.validate()
        // 实现编辑功能
        // 1.编辑接口封装
        // 2.formData.id存在与否，判断当前是处于编辑状态还是新增状态
        // 3.编辑模式 调用编辑的接口 新增模式 调用新增接口
        this.formData.id ? await updateRole(this.formData) : await addRole(this.formData)
        this.$emit('refList')
        this.$message.success(this.formData.id ? '编辑成功' : '新增成功')
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>

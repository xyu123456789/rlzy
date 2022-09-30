<template>
  <div class="departments-container">
    <el-card>
      <trueTools :isRoot="false" :tree-node="company"></trueTools>
    </el-card>
    <el-tree :data="departs" :props="defaultProps">
      <true-tools slot-scope="{ data }" :tree-node="data" @addDept="addDepts"></true-tools>
    </el-tree>
    <add-dept :showDialog.sync="showDialog" :tree-Node="currentNode"></add-dept>
  </div>
</template>

<script>
import trueTools from './componenst/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import addDept from './componenst/add-dept.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    trueTools,
    addDept
  },
  data() {
    return {
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      showDialog: false,
      currentNode: {}
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const { depts, companyName, companyManage } = await getDepartments()
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
      // console.log(depts)
    },
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.currentNode = node
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  // .el-tree-node__body {
  //   padding-right: 0px !important;
  // }
}
</style>

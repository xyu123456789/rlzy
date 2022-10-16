
<template>
  <div class="app-container">
    <!-- <div> -->
    <!-- 插槽的使用方法 -->
    <!-- <template v-slot:before>
        <span>共25条记录</span>
      </template> -->
    <!-- <template #before>
        <span>共25条记录</span>
      </template> -->
    <!-- <template v-slot="scope">
        <span>共25条记录{{ scope }}</span>
      </template> -->
    <!-- </div> -->
    <PageTools>
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="头像">
          <template slot-scope="{row}">
            <img
              style=" width: 100px;"
              :src="row.staffPhoto"
              alt=""
              @click="genQrCode(row.staffPhoto)"
            >
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn">
          <!-- <template slot-scope="{row}">
            <span>{{ row.formOfEmployment }}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{row}">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{row}">
            <el-switch
              :value="row.enableState===1"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="goDetail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next,sizes,total"
          :total="total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,5,10]"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <addEmployees :dialog-visible.sync="dialogVisible" />
    <el-dialog
      title="预览头像"
      :visible.sync="dialogVisibleQrCode"
      width="50%"
    >
      <canvas ref="canvas" />
    </el-dialog>
  </div>
</template>

<script>
import EnumHireType from '@/api/constant/employees'
import { getEmployeeList, delEmployee } from '@/api/employees'
import addEmployees from './components/add-employees.vue'
import QRCode from 'qrcode'
export default {
  name: 'HrsasssIndex',
  components: {
    addEmployees
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnumHireType.hireType,
      dialogVisible: false,
      dialogVisibleQrCode: false
    }
  },
  mounted() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellValue) {
      const res = this.hireType.find(ele => ele.id === cellValue)
      return res && res.value || '非正式'
    },
    handleEmploy() {
      this.dialogVisible = true
    },
    async del(id) {
      try {
        await this.$confirm('您确定删除该员工吗', '提示', {
          type: 'warning'
        })
        await delEmployee(id)
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    async  exportExcel() {
      // 文件懒加载
      // import('@/vendor/Export2Excel').then(res => {
      //   // 打印一下看一下加载成功了吗
      //   console.log(
      //     res
      //   )
      // })
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeeList({ page: 1, size: this.total })
      // console.log(rows)
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(headers)
      const data = rows.map(item => {
        return header.map(h => {
          if (h === '聘用形式') {
            const find = this.hireType.find(hire => hire.id === item[headers[h]])
            return find ? find.value : '未知'
          }
          return item[headers[h]]
        })
      })
      // console.log(data)
      export_json_to_excel({
        header, // 表头 必填
        multiHeader: [['姓名', '主要信息', '', '', '', '共享信息', '']],
        merges: ['A1:A2', 'B1:E1', 'F1:G1'],
        data, // 具体数据 必填
        filename: '员工列表', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    },
    goDetail(row) {
      this.$router.push('/employees/detail/' + row.id)
    },
    genQrCode(staffPhoto) {
      if (!staffPhoto) return this.$message.error('暂无头像')
      this.dialogVisibleQrCode = true
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.canvas, 'sample text', function(error) {
          if (error) console.error(error)
          console.log('success!')
        })
      })
    }

  }
}
</script>

<style>

</style>

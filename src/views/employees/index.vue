<template>
  <div>
    <page-tools type="success">
      <!-- <template v-slot:before>
        <span>共25条记录</span>
      </template> -->
      <!-- <template #before>
        <span>共25条记录</span>
      </template> -->
      <!-- <template v-slot="scope">
        <span>共25条记录{{ scope }}</span>
      </template> -->
      <template #before>
        <span>共25条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </page-tools>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  components: {

  }
}
</script>

<style>

</style>

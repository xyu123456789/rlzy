<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- 测试图标 -->
    <!-- <svg-icon icon-class="eye-open" /> -->
    <!-- <svg-icon iconClass="eye-open"></svg-icon> -->
    <!-- <UploadExcel :before-upload="beforeUpload" :on-success="hand" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    hand(data) {
      console.log('data', data)
    },
    beforeUpload(file) {
      console.log(file)
      if (file.size > 1024) {
        this.$message.error('to Big')
        return false
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

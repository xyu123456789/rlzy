<template>
  <div>
    <el-upload
      v-loading="loading"
      class="uploading"
      action="#"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :limit="1"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 预览图片弹出层 -->
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <img style="width:100%" :src="img">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID1xkmeHoopCOPEsLdr4DCIPYvAD7pO4fV',
  SecretKey: 'nSy9YpDA5tWzJZikAVlvwnUisuhR2Sjs'
})
export default {
  name: 'ImageUpload',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fileList: [

      ],
      dialogVisible: false,
      img: '',
      loading: false
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default', url: this.defaultUrl
      })
    }
  },
  methods: {
    onPreview(file) {
      this.img = file.url
      this.dialogVisible = true
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    // 上传之前
    beforeUpload(file) {
      // 文件类型
      const allowTypes = ['image/jpeg', 'image/png', 'image/gif']
      // 循环，查找某一个数据，是否在数组中
      // 1.some()某一个数据是否在数组中
      // 2.find()查找，返回找到的那一项
      // 3.findIndex()查找，找到那一项的索引，常用于复杂的查找
      // 4.indexOf()查找，返回的索引[{id:1},{id:2}]常于用简单数组类型
      // 5.includes()查找，返回的布尔值，简单数组类型
      const ishas = allowTypes.includes(file.type)
      if (!ishas) {
        // this.$message.error(`亲，只能上传+${allowTypes.join('、')}格式`)
        this.$message.error('亲，只能上传' + allowTypes.join('、') + '格式')
        return false
      }
      // 限制图片的大小
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片不能超过1mb')
        return false
      }
    },
    // 本地选择上传 原来有一个数据+选择的数据
    // 请求上传成功/失败原来就有一个数据
    onChange(file, fileList) {
      this.fileList = fileList
      // this.fileList.push(file)
    },
    onHttpRequest({ file }) {
      this.loading = true
      cos.uploadFile({
        Bucket: 'hz-33-1314348489', /* 填写自己的bucket，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传失败')
        this.loading = false
        this.$emit('on-success', {
          imgUrl: 'https://' + data.location
        })
      })
      // }, function(err, data) {
      //   console.log(err || data)
      // if (err) {
      //   console.log('上传失败', err)
      // } else {
      //   console.log('上传成功', data)
      // }
      // })
    }
  }

}
</script>

<style>
.uploading{
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>

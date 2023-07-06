<template>
  <div>
    <el-table
        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        highlight-current-row
        border
        style="width: 80%; margin-left: 200px">
<!--      <el-table-column-->
<!--          header-align="center"-->
<!--          align="center"-->
<!--          prop="FeedbackID"-->
<!--          label="反馈ID"-->
<!--          width="120">-->
<!--      </el-table-column>-->
      <el-table-column
          header-align="center"
          align="center"
          prop="Time"
          label="反馈时间"
          width="120">
      </el-table-column>
      <el-table-column
          header-align="center"
          align="center"
          prop="Ftext"
          label="反馈内容"
          width="650">
      </el-table-column>
      <el-table-column
          header-align="center"
          align="center"
          label="附件"
          width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.Attachment"
                     @click="handleClick(scope.row)"
                     type="text" size="small">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        style="margin-left: 400px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      totalItems: 0,
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    handleClick(row) {
      window.open(row.Attachment, '_blank'); // 这里假设附件URL是在"Attachment"字段
    },

    fetchData() {
      axios.get('https://localhost:8080/api/auth/getAllFeedback') // 注意改成了https这里也要跟着变
        .then((response) => {
          console.log(response.data);
          const { feedbacks } = response.data.data;

          feedbacks.forEach((feedback) => {
            // 将时间字符串转换为日期对象
            const date = new Date(feedback.Time);
            // 更新反馈对象的时间属性为格式化后的日期字符串
            // eslint-disable-next-line no-param-reassign
            feedback.Time = date.toLocaleDateString();
          });

          this.tableData = feedbacks;
          this.totalItems = feedbacks.length;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1; // 如果改变每页显示的数量，回到第一页
    },

    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style>
.el-pagination .number-goto .el-input__inner,
.el-pagination .el-pager li.active {
  color: blue !important;
  border-color: transparent !important;
}
</style>

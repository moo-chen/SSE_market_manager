<template>
    <div class="table-responsive">
    <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">编号</th>
      <th scope="col">举报类型</th>
      <th scope="col">举报时间</th>
      <th scope="col">举报信息</th>
      <!-- <th scope="col">举报理由</th> -->
      <th scope="col">操作</th>
    </tr>
  </thead>
  <tbody>
        <tr v-for="(sue, index) in sues" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ sue.Targettype }}</td>
          <td>{{ formatDate(sue.Time) }}</td>
          <td><button class="btn btn-primary" @click="viewSueDetails(sue)">查看详情</button></td>
          <!-- <td><button class="btn btn-warning text-white" @click="viewReasonModal(sue)">
            显示理由</button></td> -->
          <td>
            <button class="btn btn-success mr-2" @click="noviolation(sue)">无违规</button>
            <!-- <b-modal v-model="showNovioModal" title="确认无违规" ok-title="Confirm"
                @ok="noviolation(sue)">
                <p>被举报内容是否属实</p>
            </b-modal> -->
            <button class="btn btn-danger" @click="Violation(sue)">违规</button>
            <!-- <b-modal v-model="showVioModal" title="确认违规" ok-title="Confirm"
                @ok="postdelete(post)">
                <p>被举报内容是否不属实</p>
            </b-modal> -->
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal" :class="{ 'show': showDetailsModal,
    'd-block': showDetailsModal }" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">举报详情</h5>
            <button type="button" class="close" aria-label="Close" @click="closeDetailsModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>被举报内容：</h5>
            <p>{{ selectedSue && selectedSue.Targettitle }}
              {{ selectedSue && selectedSue.Targetdetail }}</p>
          </div>
          <div class="modal-body">
            <h5>举报理由：</h5>
            <p>{{ selectedReason }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDetailsModal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  data() {
    return {
      sues: [],
      showDetailsModal: false, // 控制举报详情模态框的显示状态
      selectedSue: null, // 存储当前选中的举报对象
      // showReasonModal: false, // 控制举报理由模态框的显示状态
      selectedReason: '', // 存储当前选中的举报理由
      showNovioModal: false,
      showVioModal: false,
    };
  },
  methods: {
    ...mapActions('userModule', ['getSues']),
    ...mapActions('userModule', { noViolation: 'noViolation' }),
    ...mapActions('userModule', { violation: 'violation' }),
    viewSueDetails(sue) {
      this.selectedSue = sue;
      this.selectedReason = sue.Reason;
      this.showDetailsModal = true;
    },
    closeDetailsModal() {
      this.showDetailsModal = false;
    },
    // viewReasonModal(sue) {
    //   this.selectedReason = sue.Reason;
    //   this.showReasonModal = true;
    // },
    // closeReasonModal() {
    //   this.showReasonModal = false;
    //   this.selectedReason = '';
    // },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getFullYear()}年${
        d.getMonth() + 1
      }月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    },
    noviolation(sue) {
      this.noViolation({ sueID: sue.SueID }).then(() => {
        this.$bvToast.toast('审核成功', {
          title: '系统提醒',
          variant: 'primary',
          solid: true,
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 400);
      }).catch((err) => {
        console.error(err);
      });
    },
    Violation(sue) {
      this.violation({ sueID: sue.SueID }).then(() => {
        this.$bvToast.toast('审核成功', {
          title: '系统提醒',
          variant: 'primary',
          solid: true,
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 400);
      }).catch((err) => {
        console.error(err);
      });
    },
  },
  created() {
    this.getSues().then((response) => {
      this.sues = response.data;
    })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
.table-responsive {
  overflow-x: auto;
}

.table th,
  .table td {
    text-align: center;
    vertical-align: middle;
    font-size: 20px;
  }

.modal {
  display: none;
  position: fixed;
  z-index: 1050;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

.modal.show {
  display: block;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}

.modal-title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.25rem;
  font-weight: 500;
  font-size: 20px;
  color: #222;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
  font-size: 20px;
  line-height: 2;
  color: #333;
  font-weight: bold;
}

.modal-body p {
  white-space: normal;
  word-wrap: break-word;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #e9ecef;
}

.d-block {
  display: block !important;
}

</style>

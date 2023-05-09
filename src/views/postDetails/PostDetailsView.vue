<template>
  <div style="margin-top: 60px;">
    <b-button variant="primary" class="back_button"
      @click="goback" style="margin-left: 60px;">
      <b-icon-reply class="mr-2"></b-icon-reply>返回
    </b-button>
  <div class='postDetails' style="margin-left:200px">
    <b-card class='mx-auto my-5' style="max-width: 1500px;">
      <div class='author-box mb-2'>{{ post.author }}</div>
      <h2 class='title-font-size mb-3'>{{ post.title }}</h2>
      <p class='content-font-size mb-3'>{{ post.content }}</p>
      <div class="d-flex justify-content-between">
        <small class="text-muted">{{ formatDate(post.postTime) }}</small>
      </div>
      <div class='d-flex justify-content-between align-items-center mt-3'>
        <div class="text-muted">
          <b-icon :icon="post.isLiked ? 'heart-fill' : 'heart'"
          @click.stop="like(post)" :class="{ 'text-danger': post.isLiked }"></b-icon>
          {{ post.like }}
        </div>
        <div class='text-muted'><b-icon icon='chat-dots-fill'></b-icon> {{ post.comment }}</div>
      </div>
    </b-card>
  </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  data() {
    return {
      partition: '',
      post: {
        postID: '',
        author: '',
        title: '',
        content: '',
        like: '',
        comment: '',
        postTime: '',
        isLiked: '',
      },
    };
  },
  created() {
    this.partition = this.$route.params.partition;
    if (this.$route.params.id) {
      this.post.postID = this.$route.params.id;
      // 将postID保存在本地缓存中
      localStorage.setItem('PostID', JSON.stringify(this.$route.params.id));
    } else {
      // 在本地缓存在直接读取postID
      this.post.postID = JSON.parse(localStorage.getItem('PostID'));
    }
    const userTelephone = this.userInfo.telephone;
    // 根据该id向后端发送请求，获取该帖子的详细信息，并展示在页面上
    this.postShowDetails({ userTelephone, postID: this.post.postID })
      .then((post) => {
        this.post.postID = post.data.PostID;
        this.post.author = post.data.UserName;
        this.post.title = post.data.Title;
        this.post.content = post.data.Content;
        this.post.like = post.data.Like;
        this.post.comment = post.data.Comment;
        this.post.postTime = post.data.PostTime;
        this.post.isLiked = post.data.IsLiked;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  beforeRouteLeave(to, from, next) {
    // 返回上一页面时清空本地缓存
    localStorage.removeItem('PostID');
    localStorage.setItem('Partition', JSON.stringify(this.partition));
    next();
  },
  methods: {
    ...mapActions('postModule', { postShowDetails: 'showDetails' }),
    ...mapActions('postModule', { postLike: 'like' }),
    goback() {
      window.history.back();
    },
    formatDate(date) {
      // 格式化日期时间
      const d = new Date(date);
      return `${d.getFullYear()}年${
        d.getMonth() + 1
      }月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    },
    like() {
      const userTelephone = this.userInfo.telephone;
      // 请求
      this.postLike({
        userTelephone, postID: this.post.postID, isLiked: this.post.isLiked,
      }).then(() => {
      }).catch((err) => {
        console.error(err);
      });
      // 更新点赞状态及点赞数
      this.post.isLiked = !this.post.isLiked;
      if (this.post.isLiked) this.post.like += 1;
      else this.post.like -= 1;
    },
  },
};
</script>

<style>
@import '../../style/css/PostDetailsView.css';
</style>

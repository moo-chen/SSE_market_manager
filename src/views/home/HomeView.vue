<template>
  <div class="post-view">
    <b-button variant="primary" v-if="this.partition != '主页'"
      @click="returnHome" style="margin-left: 60px;">
      <b-icon-reply class="mr-2"></b-icon-reply>回到主页
    </b-button>
    <b-row>
      <b-col v-for="post in posts" :key="post.id" cols="12" md="12" lg="12" class="mb-3">
        <b-card class="px-3 py-2 card-shadow"
        @click="$router.push({ name: 'postDetails', params: { id: post.id }})">
          <b-row class="mt-0">
            <b-col md="4" class="mb-2">
              <div class="author-box" @click.stop>
                {{ post.author }}
              </div>
            </b-col>
          </b-row>
          <b-card-title>{{ post.title }}</b-card-title>
          <b-card-text>{{ post.content }}</b-card-text>
          <div class="d-flex justify-content-between">
            <small class="text-muted">{{ formatDate(post.postTime) }}</small>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="text-muted">
              <b-icon :icon="post.isLiked ? 'heart-fill' : 'heart'"
              @click.stop="like(post)" :class="{ 'text-danger': post.isLiked }"></b-icon>
              {{ post.like }}
            </div>
            <div class="text-muted"><b-icon icon="chat-dots-fill"></b-icon> {{ post.comment }}</div>
          </div>
        </b-card>
      </b-col>
    </b-row>
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
      partition: '主页',
      posts: [],
      userTelephone: '',
      postID: '',
      isLiked: '',
    };
  },
  created() {
    if (this.$route.params.partitions && this.$route.params.partitions !== '主页') {
      this.partition = this.$route.params.partitions;
    } else {
      this.partition = '主页';
    }
    // 在页面创建时默认加载主页帖子列表
    this.browsePosts();
  },
  methods: {
    ...mapActions('postModule', { postBrowse: 'browse' }),
    ...mapActions('postModule', { postLike: 'like' }),
    returnHome() {
      this.partition = '主页';
      this.browsePosts();
    },
    async browsePosts() {
      this.userTelephone = this.userInfo.telephone;
      // 从后端返回一个结构体变量的方法
      try {
        // 向后端发送请求并获取帖子列表
        const { data } = await this.postBrowse({
          userTelephone: this.userTelephone, partition: this.partition,
        });
        // 将获取到的帖子列表数据赋值给 posts 变量
        this.posts = data.map((post) => ({
          id: post.PostID,
          author: post.UserName,
          title: post.Title,
          content: post.Content,
          like: post.Like,
          comment: post.Comment,
          postTime: post.PostTime,
          isLiked: post.IsLiked,
        })).sort((a, b) => new Date(b.postTime) - new Date(a.postTime)); // 按时间倒序排序展示
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(date) {
      // 格式化日期时间
      const d = new Date(date);
      return `${d.getFullYear()}年${
        d.getMonth() + 1
      }月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    },
    like(post) {
      // 切换点赞状态
      const updatedPost = { ...post, isLiked: !post.isLiked };
      // 更新点赞数
      updatedPost.like += post.isLiked ? -1 : 1;
      // 用更新后的 post 对象替换原先的 post 对象
      this.posts.splice(this.posts.indexOf(post), 1, updatedPost);
      this.userTelephone = this.userInfo.telephone;
      this.postID = post.id;
      this.isLiked = post.isLiked;
      // 请求
      this.postLike({
        userTelephone: this.userTelephone, postID: this.postID, isLiked: this.isLiked,
      }).then(() => {
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/css/HomeView.css';
</style>

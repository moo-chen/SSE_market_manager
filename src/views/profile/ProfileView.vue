<template>
  <div class="post-view">
    <b-row class="mt-3">
      <b-col md="4" class="mb-2">
        <b-form-select v-model="partition">
          <b-form-select-option value="主页"></b-form-select-option>
          <b-form-select-option value="日常吐槽">日常吐槽</b-form-select-option>
          <b-form-select-option value="学习交流">学习交流</b-form-select-option>
          <b-form-select-option value="恋爱交友">恋爱交友</b-form-select-option>
          <b-form-select-option value="二手闲置">二手闲置</b-form-select-option>
          <b-form-select-option value="打听求助">打听求助</b-form-select-option>
          <b-form-select-option value="其他">其他</b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col md="0" class="text-right mb-2">
        <b-button variant="primary" @click="browsePosts">跳转</b-button>
      </b-col>
      <b-col md="7" class="text-right mb-2">
        <b-button variant="primary" @click="$router.replace({ name: 'post' })">发帖</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="post in posts" :key="post.id" cols="12" md="12" lg="12" class="mb-3">
        <b-card class="px-3 py-2 card-shadow" @click="showDetails(post)"
        style="border: none; background-color: #f8f9fa;">
          <b-row class="mt-0">
            <b-col md="4" class="mb-2">
              <div class="author-box">
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
              @click="like(post)" :class="{ 'text-danger': post.isLiked }"></b-icon>
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
    // 在页面创建时默认加载主页帖子列表
    this.browsePosts();
  },
  methods: {
    ...mapActions('userModule', { userBrowse: 'browse' }),
    ...mapActions('userModule', { userLike: 'like' }),
    ...mapActions('userModule', { userShowDetails: 'showDetails' }),
    async browsePosts() {
      this.userTelephone = this.userInfo.telephone;
      // 从后端返回一个结构体变量的方法
      try {
        // 向后端发送请求并获取帖子列表
        const { data } = await this.userBrowse({
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
      this.userLike({
        userTelephone: this.userTelephone, postID: this.postID, isLiked: this.isLiked,
      }).then(() => {
      }).catch((err) => {
        console.error(err);
      });
    },
    showDetails(post) {
      this.userShowDetails({ postID: post.id }).then(() => {
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-shadow {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.author-box {
  background-color: rgb(17, 167, 226);
  color: white;
  padding: 0.25rem 0.5rem;
  width: auto;
  display: inline-block;
  border-radius: 0.25rem;
}

.title-font-size {
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Times New Roman';
}

.content-font-size {
  font-size: 1rem;
  line-height: 1.5;
  font-family: 'Arial';
}

.text-color {
  color: #6c757d;
}
</style>

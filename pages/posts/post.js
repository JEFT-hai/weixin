// pages/posts/post.js

var postsData = require('../../data/posts-data.js')
Page({
  data: {
    postlist:[]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  //  this.data.postlist = postsData.postlist;
   this.setData({
     postlist:postsData.postlist
   })
    // this.setData({ posts_key: postsData.postlist });
   // console.log(this.data.postlist)  
  },
  // readyLoad:function(event){
  //   this.setData({
  //    postlist:postsData.postlist
  //  })
  //  console.log(this.data.postlist)
  // },
  onPostTap:function(event){
      var postId = event.currentTarget.dataset.postid;
      console.log(postId)
      wx.navigateTo({
        url: "post-detail/post-detail?id=" + postId
      })
    },

     onSwiperTap:function(event){
      var postId = event.target.dataset.postid;
      console.log(event.target)
      wx.navigateTo({
        url: "post-detail/post-detail?id=" + postId
      })
    }
    
})
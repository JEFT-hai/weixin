// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({
  data:{
    isPlayingMusic:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var postId = options.id;
    this.data.currentpostId = postId;
    var postData = postsData.postlist[postId];
    this.setData({
      postData:postsData.postlist[postId]
    })
    postsData.postlist[postId].reading++;
    
    var postscollected = wx.getStorageSync('posts_collected');
    if(postscollected){
      var postcollected = postscollected[postId];
      this.setData({
        collected:postcollected
      })
    }else{
      var postscollected = {};
      postscollected[postId] = false;
      wx.setStorageSync('posts_collected', postscollected);
    }

    if(app.globalData.g_isPalyingMusic && app.globalData.g_currentMusicPostId === postId){
      this.data.isPlayingMusic=true
    }

    var that = this;
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic:true
      })
      app.globalData.g_isPalyingMusic=true;
      app.globalData.g_currentMusicPostId = postId;
    })
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic:false
      })
      app.globalData.g_isPalyingMusic=false;
      app.globalData.g_currentMusicPostId = null;
    })
    wx.onBackgroundAudioStop(function() {
      that.setData({
        isPlayingMusic:false
      })
      app.globalData.g_isPalyingMusic=false;
      app.globalData.g_currentMusicPostId = null;
    })

    
  },
  onCollectionTap:function(event){
    var postscollected = wx.getStorageSync('posts_collected');
    var postcollected = postscollected[this.data.currentpostId];
    postcollected = !postcollected;
    postscollected[this.data.currentpostId] = postcollected;
    wx.setStorageSync('posts_collected', postscollected);
    this.setData({
        collected:postcollected
    })

    wx.showToast({
      title:postcollected?"收藏成功":"取消成功",
      duration:1000
    })
  },
  onsharetap:function(event){
    var itemlist = [
      "分享给微信好友",
      "分享给QQ好友",
      "分享到朋友圈",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList:itemlist,
      itemColor:"#405f80",
      success:function(res){
        wx.showModal({
          title:"用户"+itemlist[res.tapIndex],
          content:"用户是否取消？"+res.cancel+"现在无法实现分享功能"
        })
      }

    })

  },
   onmusicTap:function(event){
    var currentpostId = this.data.currentpostId;
    var postData = postsData.postlist[currentpostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title:postData.music.title,
        coverImgurl:postData.music.coverImg
      })
      this.setData({
        isPlayingMusic:true
      })
    }
  }

 

})
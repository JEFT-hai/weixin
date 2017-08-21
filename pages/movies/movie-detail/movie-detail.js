// pages/movies/movie-detail/movie-detail.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data:{
    movie:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var movieId = options.id;
    var url = app.globalData.doubanBase+
    "/v2/movie/subject/"+movieId;
    util.http(url,this.processDoubanData);
  },
  processDoubanData:function(data){
    console.log(data)
    if(! data){
      return;
    }
    var director = {
      avatar:"",
      name:"",
      id:""
    }
    if(data.directors[0] != null){
      if(data.directors[0].avatars != null){
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg:data.images?data.images.large:"",
      country:data.countries[0],
      title:data.title,
      originalTitle:data.origianl_title,
      wishCount:data.wish_count,
      commentCount:data.comments_count,
      year:data.year,
      generes:data.genres.join("、"),
      stars:util.convertToStarsArray(data.rating.stars),
      score:data.rating.average,
      director:director,
      casts:util.convertToCastString(data.casts),
      castsInfo:util.convertToCastInfos(data.casts),
      summary:data.summary
    }
    this.setData({
      movie:movie
    })
  },
  // 查看图片
  viewMoviePostImg:function(e){
    var src=e.currentTarget.dataset.src;
    wx.previewImage({
      current:src,
      urls:[src]
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
// pages/movies/movies.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data:{
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult:{},
    containerShow:true,
    searchPanelShow:false
  },
  onLoad:function(event){
    var inTheaterUrl = app.globalData.doubanBase + "/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"+"?start=0&count=3";
    var top250Url = app.globalData.doubanBase +"/v2/movie/top250"+"?start=0&count=3";

    this.getMovieListData(inTheaterUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣top250");
  },
  getMovieListData:function(url,settedKey,categoryTitle){
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type":"application/xml"
      }, // 设置请求的 header
      success: function(res){
        // success
        that.processDoubanData(res.data,settedKey,categoryTitle);
      },
      fail: function() {
        // fail
        console.log("出现错误")
      }
    })
  },

  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },

  onBindConfirm:function(event){
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl,"searchResult","")
  },

  onCancelImgTap:function(event){
    this.setData({
      containerShow:true,
      searchPanelShow:false
    })
  },

  processDoubanData:function(moviesDouban,settedKey,categoryTitle){
    var movies = [];
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length>=6){
        title = title.substring(0,6) + "...";
      }
      var temp={
        stars:util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey]={movies:movies,categoryTitle:categoryTitle};
    this.setData(readyData);
  },
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category="+category
    })
  },
  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "movie-detail/movie-detail?id="+ movieId
    })
  }
})
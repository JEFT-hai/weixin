Page({
    data:{},
    onLoad:function(options){

    },
    onTapTo:function(event){
        wx.switchTab({
            url: '../posts/post'
        })
    }

})
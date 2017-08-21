function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

function convertToStarsArray(starts){
  var num = starts.toString().substring(0,1);
  var array = [];
  for(var i=1;i<=5;i++){
    if(i<=num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
  return array
}

function convertToCastString(casts){
  var castsjoin = "";
  for(var idx in casts){
    castsjoin = castsjoin + casts[idx].name + "/";
  }
  return castsjoin.substring(0,castsjoin.length-1);
}

function convertToCastInfos(casts){
  var castsArray = [];
  for(var idx in casts){
    var cast = {
      img:casts[idx].avatars ? casts[idx].avatars.large:"",
      name:casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray
}


function http(url,callBack){
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type":"application/xml"
      }, // 设置请求的 header
      success: function(res){
        // success
        callBack(res.data);
      },
      fail: function(error) {
        // fail
        console.log(error)
      }
    })
  }
module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString:convertToCastString,
  convertToCastInfos:convertToCastInfos
}

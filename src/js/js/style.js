"use strict";$(function(){$(function(){FastClick.attach(document.body),$("img").on("mousedown",function(n){n.preventDefault()})}),$(function(){$(".active_rule").click(function(){window.location.href="active_rule.html"})}),$(function(){var o=$(".scroll_con ul li").outerWidth(!0);$(".scroll_con ul").css({width:12*o+"px",marginLeft:"0"}),setInterval(function(){var n=parseInt($(".scroll_con ul").css("marginLeft"));$(".scroll_con ul").css({"margin-left":n-1+"px"}),n<-o&&($(".scroll_con ul li:eq(0)").appendTo($(".scroll_con ul")),$(".scroll_con ul").css({"margin-left":0}))},20)}),$(function(){$(".dui_m").click(function(){window.location.href="ticketdetails.html?clazzId="+t.clazzId+"&type=0&token="+t.token+"&userId="+t.uid+"&activityId="+t.activityId}),$(".zhong_m").click(function(){window.location.href="zhongdetails.html?clazzId="+t.clazzId+"&type=1&token="+t.token+"&userId="+t.uid+"&activityId="+t.activityId}),$(".one").on("touchend",function(){console.log(a),a<1?$(".duifixed").fadeIn():c(t,1)}),$(".five").click(function(){a<5?$(".duifixed").fadeIn():c(t,5)}),$(".twn").click(function(){a<10?$(".duifixed").fadeIn():c(t,10)}),$(".eight").click(function(){a<88?$(".duifixed").fadeIn():c(t,88)}),$(".mie").click(function(){$(".duifixed").fadeOut()}),$(".happy").click(function(){$(".jl").fadeOut()})});var a,n=window.location.host,i="";i=-1<n.indexOf("teacherasst.openonline.com.cn")?"http://teacherasst.openonline.com.cn:80":"/api";var o,e,t=function(){for(var n=new Object,o="activityId=2&uid=249&token=j3uRhnQHL0I6ZCVxqH41nw4Tx9pUmP/N&clazzId=326".split("&"),e=0;e<o.length;e++){var i=o[e].indexOf("=");if(-1!=i){var t=o[e].substring(0,i),c=o[e].substring(i+1);n[t]=encodeURI(c)}}return n}();function c(n,e){var o={params:{couponmoney:1==e?"COUPONMONEYONE":5==e?"COUPONMONEYFIVE":10==e?"COUPONMONEYTEN":"COUPONMONEYETE",activityId:n.activityId},token:n.token,userId:n.uid};$.ajax({type:"POST",dataType:"json",headers:{device:"ios",version:"1.3.3",UserAgent:"teacher"},url:i+"/business/activity/recAwd.json",contentType:"application/json",data:JSON.stringify(o),success:function(n){if(200==n.code){console.log(n),$(".jl").fadeIn(),console.log(e);var o="<span>0</span>"+e;$(".jl_box .jin").html(o),e<10?$(".jl_box .jin span").show():$(".jl_box .jin span").hide(),$(".jl_box h2").text(n.data.awardVoList[0].couponCode)}else $(".duifixed2").show(),$(".duifixed2 .dui_box2 p").text(n.message),$(".mie2").click(function(){$(".duifixed2").hide()})},error:function(n){console.log(n.status)}})}console.log(t),e={params:{clazzId:(o=t).clazzId,activityId:o.activityId},token:o.token,userId:o.uid},$.ajax({type:"POST",dataType:"json",headers:{device:"ios",version:"1.3.3",UserAgent:"teacher"},url:i+"/business/activity/getActivityDetail.json",contentType:"application/json",data:JSON.stringify(e),success:function(n){if(console.log(n),200==n.code)if(n.data.activityDetail){var o=n.data.activityDetail;$(".state h1 span").text(o.fund),a=o.fund?o.fund:0,$(".roll ul li").eq(0).children("h2").children("span").text("已兑"+o.couponMoneyList[0].fakeCouponMoneyCount+"份"),$(".roll ul li").eq(1).children("h2").children("span").text("已兑"+o.couponMoneyList[1].fakeCouponMoneyCount+"份"),$(".roll ul li").eq(2).children("h2").children("span").text("已兑"+o.couponMoneyList[2].fakeCouponMoneyCount+"份"),$(".roll ul li").eq(3).children("h2").children("span").text("已兑"+o.couponMoneyList[4].fakeCouponMoneyCount+"份");var e=[];o.couponMoneyList.forEach(function(n,o){e.push(n.couponMoneyCount),e.push(n.fakeCouponMoneyCount)});for(var i=0,t=0;t<e.length;t++)i+=e[t];var c="已有 "+i+"人参与活动";$(".scroll_con h4").text(c)}else a=0;else $(".duifixed2").show(),$(".duifixed2 .dui_box2 p").text(n.message),$(".mie2").click(function(){$(".duifixed2").hide()})},error:function(n){console.log(n.status)}})});
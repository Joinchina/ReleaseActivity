$(function(){
	//阻止页面放大缩小
	$(function(){
		document.addEventListener('touchstart',function (event) {  
            if(event.touches.length>1){  
                event.preventDefault();  
            }  
        })  
        var lastTouchEnd=0;  
        document.addEventListener('touchend',function (event) {  
            var now=(new Date()).getTime();  
            if(now-lastTouchEnd<=300){  
                event.preventDefault();  
            }  
            lastTouchEnd=now;  
        },false)  
	});

	$(function() {
		FastClick.attach(document.body);
		$('img').on('mousedown',function (e) {
		    e.preventDefault()
		})
	});
	$(function(){
		$(".active_rule").click(function(){
			window.location.href="active_rule.html"
		})
	})
	//列表网左滚动;
//	$(function(){
//		var ulwidth=$(".scroll_con ul li").outerWidth(true);
//	    $(".scroll_con ul").css({"width":ulwidth*12+'px','marginLeft':'0'});
//	    setInterval(function(){
//	    	var n = parseInt($(".scroll_con ul").css('marginLeft'));
//	    	$(".scroll_con ul").css({"margin-left":n-1+"px"});
//	    	if(n<-ulwidth){
//	    		$(".scroll_con ul li:eq(0)").appendTo($(".scroll_con ul"));
//	    		$(".scroll_con ul").css({"margin-left":0});
//	    	}
//	    }, 20);
//	});
	//判断是否是线上环境
	var host = location.host;
	var api = "";
	if(host.indexOf("teacherasst.openonline.com.cn") > -1){
		api = "http://teacherasst.openonline.com.cn:80"
	}else{
		api='/api'
	};
	//用户余额的变量
	var balance;
	//获取url传递过来的参数
	function GetUrlParms() {
		 var args=new Object();
		 //var query=window.location.search.substring(1);//获取查询串 
		 var query='activityId=11&uid=437&token=KJR3xvag82jkI5PR0Cqq2DVIYRVaUtFT&clazzId=551';//获取查询串 
		 var pairs=query.split("&");
		 for(var i=0;i<pairs.length;i++) { 
		   var pos=pairs[i].indexOf('=');
		   if(pos==-1) continue;
		   var argname=pairs[i].substring(0,pos);
		   var value=pairs[i].substring(pos+1);
		   args[argname]=encodeURI(value);
		 };
		 return args;
	};
	//定义一个变量用来接收参数
	var argument=GetUrlParms();
    //一些请求信息
	$(function(){
		$(".dui_m").click(function(){
			window.location.href="ticketdetails.html?clazzId="+argument.clazzId+"&type="+0+"&token="+argument.token+"&userId="+argument.uid+"&activityId="+argument.activityId+"";
		});
		$(".zhong_m").click(function(){
			window.location.href="zhongdetails.html?clazzId="+argument.clazzId+"&type="+1+"&token="+argument.token+"&userId="+argument.uid+"&activityId="+argument.activityId+"";
		});
		$(".one").click(function(){
			console.log(balance)
            if(balance<1){
            	$(".duifixed").fadeIn();
            }else{
            	getdata(argument,1)
            }			
		});
		$(".five").click(function(){
			if(balance<5){
            	$(".duifixed").fadeIn();
            }else{
            	getdata(argument,5)
            }	
		});
		$(".twn").click(function(){
			if(balance<10){
            	$(".duifixed").fadeIn();
            }else{
            	getdata(argument,10)
            }
		});
		$(".eight").click(function(){
			if(balance<88){
            	$(".duifixed").fadeIn();
            }else{
            	getdata(argument,88)
            }
		});
		$(".mie").click(function(){
			$(".duifixed").fadeOut();
		});
		$(".happy").click(function(){
			$(".jl").fadeOut();
		});
	});		
	//判断clazzid是否存在ajax获取账户明细
	if(argument.clazzId==undefined || argument.clazzId==null || argument.clazzId==''){		
		var noclassid='您还没有班级，<br/>请先创建班级后才能参与活动哦！';
		noclass(noclassid);
		balance=0;
	}else{
		getdetail(argument)
		function getdetail(n){
		    var getdata={
				"params":{
					"clazzId":n.clazzId,
					"activityId":n.activityId
				},
				"token":n.token,
				"userId":n.uid,
			};
			//console.log(getdata)
			$.ajax({			    
			    type: "POST",
                dataType: "json",
                headers: {
		            device: "ios",
		            version: "1.3.3",
		            UserAgent: "teacher"
		        },
			    url:api+"/business/activity/getActivityDetail.json",
			    contentType: "application/json",
			    data:JSON.stringify(getdata),
			    success: function(data) {
                     console.log(data);
                     if(data.code==200){
                     	if(data.data.activityDetail){
	                 	    var msg =data.data.activityDetail;
		                    // 替换金额		                    
		                    if(msg.fund){
		                    	balance=msg.fund.toFixed(2);
		                    }else{
		                    	balance=0;
		                    };
		                    $('.state h1 span').text(balance);
		                    //console.log(balance)
		                    //替换兑奖券信息
		                    $('.roll ul li').eq(0).children('h2').children('span').text('已兑'+msg.couponMoneyList[0].couponMoneyCount+'份');
		                    $('.roll ul li').eq(1).children('h2').children('span').text('已兑'+msg.couponMoneyList[1].couponMoneyCount+'份');
		                    $('.roll ul li').eq(2).children('h2').children('span').text('已兑'+msg.couponMoneyList[2].couponMoneyCount+'份');
		                    $('.roll ul li').eq(3).children('h2').children('span').text('已兑'+msg.couponMoneyList[4].couponMoneyCount+'份')
					    	//获取兑奖人数
					    	var newArr=[];
					    	msg.couponMoneyList.forEach(function(item,index){
					    		newArr.push(item.couponMoneyCount);
					    		newArr.push(item.fakeCouponMoneyCount);			    		
					    	});
					    	//console.log(newArr)
					    	//求和
					    	var newArrall=0;
					    	for (var i=0;i<newArr.length;i++) {
					    		newArrall+=newArr[i];
					    	};
					    	//console.log(newArrall);
					    	var newstr='已有 '+newArrall+'人参与活动'
					    	$(".scroll_con h4").text(newstr)
		                }else{
		                 	balance=0;
		                };
                     }else{
                     	noclass(data.message)                
                     }
			    },
			    error: function(err){
                	console.log(err.status)
            	}
			});	
		};
		//ajax请求获取数据
		function getdata(n,j){
		    var money;
		    if(j==1){
		    	money='COUPONMONEYONE'
		    }else if(j==5){
		    	money='COUPONMONEYFIVE'
		    }else if(j==10){
		    	money='COUPONMONEYTEN'
		    }else{
		    	money='COUPONMONEYETE'
		    }
			var getdata={
				"params":{
					"couponmoney":money,
					"activityId":n.activityId,
				},
				"token":n.token,
				"userId":n.uid,
			};	        		        
			$.ajax({			    
			    type: "POST",
                dataType: "json",
                headers: {
		            device: "ios",
		            version: "1.3.3",
		            UserAgent: "teacher"
		        },
			    url:api+"/business/activity/recAwd.json",
			    contentType: "application/json",
			    data:JSON.stringify(getdata),
			    success: function(data) {
			    	if(data.code==200){			    		
			    		console.log(data);
	                     $(".jl").fadeIn();
	                     console.log(j);
	                     var str='<span>0</span>'+j+''
	                     $(".jl_box .jin").html(str);
						//同步中奖金额
						 var mymoney=(balance-j).toFixed(2);
						     balance=mymoney;
						 $('.state h1 span').text(balance);
	                     if(j<10){
	                     	$(".jl_box .jin span").show();
	                     }else{
	                     	$(".jl_box .jin span").hide();
	                     };
	                     let JDq='京东卡密码:'+data.data.awardVoList[0].couponCode+'';
	                     $(".jl_box h2").html(JDq);			    		
			    		 //500毫秒以后回调数据
	                    setTimeout(function(){
	                    	getdetail(argument);
	                    },500) 
			    	}else{
			    		noclass(data.message);			    		
			    	};
                     
			    },
			    error: function(err){
                	console.log(err.status)
            	}
			});			
		};
	};
	//没有班级时的函数
	function noclass(str){		
     	if(str=='登陆失效，请重新登录'){
			str='该用户已在其他设备登录';
			$(".duifixed2").show();
			$(".duifixed2 .dui_box2 p").text(str);
			$(".duifixed2 .dui_box2 button").hide();
			setInterval(function(){
				$(".duifixed2").hide();
				gologo();
			},3000)
     	}else{
     		$(".duifixed2").show();
	     	$(".duifixed2 .dui_box2 p").html(str);
	     	$(".mie2").click(function(){
	     		 $(".duifixed2").hide();
	     	});
     	};	    
	};
	//强制跳转到首页
	function gologo(){
		// 根据浏览器判断是苹果设备还是安卓设备
		var ua = navigator.userAgent;
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
	    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    	if(isAndroid){
    		android.tokenLose('我是安卓');  		
    	}else{
    		console.log('我是ios')
    	}	        
	};   
})
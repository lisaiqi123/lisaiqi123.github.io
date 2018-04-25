var myApp = new Framework7({
    animateNavBackIcon: true, // 动态导航栏中back-link图标iOS风格化
    modalTitle: "提示", // 弹出层默认标题
    modalButtonOk: "确定", // 弹出层默认确定按钮
    modalButtonCancel: "取消", // 弹出层默认取消按钮
    modalCloseByOutside: true // 点击modal外部关闭弹出层
});
var $$ = Dom7;
var turnplate = {
    restaraunts: [],
    //大转盘奖品名称
    colors: [],
    //大转盘奖品区块对应背景颜色
    outsideRadius: 174,
    //大转盘外圆的半径
    textRadius: 130,
    //大转盘奖品位置距离圆心的距离
    insideRadius: 32,
    //大转盘内圆的半径
    startAngle: 0,
    //开始角度
    bRotate: false,
    //控制是否旋转
};

$(document).ready(function() {
    //动态添加大转盘的奖品与奖品区域背景颜色
    // turnplate.restaraunts = ["谢谢参与", "一等奖", "二等奖", "三等奖", "谢谢参与", "四等奖", "五等奖", "六等奖"];
    // turnplate.colors = ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"];
    turnplate.restaraunts = ["谢谢参与", "一等奖", "谢谢参与", "二等奖", "谢谢参与", "二等奖"];
    turnplate.colors = ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"];
    // turnplate.restaraunts = ["谢谢参与", "一等奖", "红包奖", "二等奖"];
    // turnplate.colors = ["transparent", "transparent", "transparent", "transparent"];
    var rotateTimeOut = function() {
        $("#wheelcanvas").rotate({
            angle: 0,
            animateTo: 2160,
            duration: 12e3,
            callback: function() {
                alert("网络超时，请检查您的网络设置！");
            }
        });
    };
    //旋转转盘 item:奖品位置; txt：提示语;
    var rotateFn = function(item, txt) {
        var angles = item * (360 / turnplate.restaraunts.length) - 360 / (turnplate.restaraunts.length * 2);
        if (angles < 270) {
            angles = 270 - angles;
        } else {
            angles = 360 - angles + 270;
        }
        $("#wheelcanvas").stopRotate();
        $("#wheelcanvas").rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 8e3,
            callback: function() {
                if (txt.indexOf("谢谢参与") != -1) {
                    myApp.modal({
                        title: '',
                        text: $("#noawardNum").html(),
                        buttons: [{
                            text: "不抽了",
                        }, {
                            text: '再试一次',
                            close: true,
                        }]
                    });
                    $(".modal.modal-in, .modal.modal-out").css({ "margin-left": "-1.58rem" });
                } else {
                    myApp.modal({
                        title: '恭喜您，获得<span>' + txt + '</span>',
                        text: $("#award-con").html(),
                        buttons: [{
                            text: '确定',
                            onClick: function() {
                                var options = {
                                    // Callback gets called when toast is hidden
                                    onHide: function() {},
                                    duration: 9000
                                };
                                var toast = myApp.toast('领取成功', options);
                                toast.show();
                            }
                        }]
                    });
                    $(".modal.modal-in, .modal.modal-out").css({ "margin-left": "-1.72rem" });
                }
                turnplate.bRotate = !turnplate.bRotate;
            }
        });
    };
    //获取抽奖机会
    var nums = $("#awardNum").text();
    $(".pointer").click(function() {
        var status = $(this).data("status");
        if (status == 0) {
            model($("#nobegain").html(), '我知道了');
        } else if (status == 2) {
            model($("#finished").html(), '我知道了');
        } else {
            if (turnplate.bRotate) return;
            nums--;
            $("#awardNum").text(nums);
            if (nums >= 0) {
                turnplate.bRotate = !turnplate.bRotate;
                var item = 1; //获取奖品停的位置
                rotateFn(item, turnplate.restaraunts[item - 1]);
            } else {
                $("#awardNum").text(0);
                if ($("#awardNum").data("status") == 0) {
                    //机会为零，没有分享
                    var options = {
                        onHide: function() {},
                        duration: 9000
                    };
                    var toast = myApp.toast('抱歉，今日已无抽奖机会~', options);
                    toast.show();
                    $(".toast-container").css({ 'margin-left': "-1.44rem" })
                } else {
                    //机会为零，可以分享
                    myApp.modal({
                        title: '',
                        text: $("#noaward").html(),
                        buttons: [{
                            text: "不抽了",
                        }, {
                            text: '<span class="show-share">分享</span>',
                            onClick: function() {
                                $('.share-masked').show();
                                $('html,body').addClass('ovfHiden'); //使网页不可滚动
                            }
                        }]
                    });
                    $(".modal.modal-in, .modal.modal-out").css({ "margin-left": "-1.58rem" });
                }
            }
        }
    });
});

function model(el, text) {
    myApp.modal({
        title: '',
        text: el,
        buttons: [{
            text: text,
            close: true,
        }]
    })
    $(".modal.modal-in, .modal.modal-out").css({ "margin-left": "-1.58rem" });
}

//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
window.onload = function() {
    drawRouletteWheel();
};

function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
        //根据奖品个数计算圆周角度
        var arc = Math.PI / (turnplate.restaraunts.length / 2);
        var ctx = canvas.getContext("2d");
        //在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, 422, 422);
        //背景
        var img = document.getElementById("scream");
        img.width = canvas.width;
        img.height = canvas.height;
        ctx.drawImage(img, 36, 36, 350, 350);
        //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
        ctx.strokeStyle = "transparent";
        //font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = "16px Microsoft YaHei";
        for (var i = 0; i < turnplate.restaraunts.length; i++) {
            var angle = turnplate.startAngle + i * arc;
            ctx.fillStyle = turnplate.colors[i];
            ctx.beginPath();
            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
            ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
            ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            //锁画布(为了保存之前的画布状态)
            ctx.save();
            //----绘制奖品开始----
            ctx.fillStyle = "#fff";
            var text = turnplate.restaraunts[i];
            var line_height = 20;
            //translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
            //rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
            if (text.indexOf("M") > 0) {
                //流量包
                var texts = text.split("M");
                for (var j = 0; j < texts.length; j++) {
                    ctx.font = j == 0 ? "bold 20px Microsoft YaHei" : "16px Microsoft YaHei";
                    if (j == 0) {
                        ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
                    } else {
                        ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                    }
                }
            } else if (text.indexOf("M") == -1 && text.length > 6) {
                //奖品名称长度超过一定范围 
                text = text.substring(0, 6) + "||" + text.substring(6);
                var texts = text.split("||");
                for (var j = 0; j < texts.length; j++) {
                    ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                }
            } else {
                //在画布上绘制填色的文本。文本的默认颜色是黑色
                //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                ctx.fillText(text, -ctx.measureText(text).width / 2, 20);
            }
            //把当前画布返回（调整）到上一个save()状态之前 
            ctx.restore();
        }
    }
}

$(document).ready(function() {
    //活动说明
    $$('.alert-guize').on('click', function() {
        myApp.modal({
            title: '',
            text: $("#discription").html(),
            buttons: [{
                text: '确定',
                close: true,
            }]
        })
    });
    //我的奖品
    $$('.alert-my').on('click', function() {
        myApp.modal({
            title: '',
            text: $("#myAward").html(),
            buttons: [{
                text: '确定',
                close: true,
            }]
        })
    });
    //点击分享蒙版
    $('.share-masked').on('click', function() {
        $('.share-masked').hide();
        $('html,body').removeClass('ovfHiden'); //使网页恢复可滚动
    });
    //获取要验证的元素
    var th = $('.model-div .censor');
    th.blur(function(event) {
        var th = $(this);
        var name = $(this).attr('name');
        var tt = censor(th, name)
        if (tt[0] == false) {
            remind(th, tt[1])
        } else {
            itemSuccess(th)
        }
    });
    th.focus(function(event) {
        var th = $(this);
        th.removeClass("redborder");
        th.next().hide();
    })
});
//验证方法
var censor = function(e, na) {
    var val = e.val();
    var length = val.length;
    switch (na) {
        case 'name':
            if (length == 0) {
                return [false, '请填写称呼']
            } else if (length > 8) {
                return [false, '申请未成功提示，称呼最大输入字符为8 请从新输入']
            } else {
                return [true]
            };
            break;
        case 'phoneNum':
            if (length == 0) {
                console.log('ok')
                return [false, '验证失败，请填写手机号码']
            } else if (!(/^1(3|4|5|6|7|8)\d{9}$/.test(val))) {
                return [false, '验证失败.请填写正确手机号格式']
            } else {
                return [true]
            };
            break;
        case 'verify-code':
            if (length == 0) {
                return [false, '输入验证码']
            } else {
                return [true]
            };
            break;
    }
};
//显示错误信息
var remind = function(e, message) {
    e.next().show().text(message);
    e.addClass("redborder");
};
//单条验证通过的方法
var itemSuccess = function(th) {
    th.next().hide();
    th.removeClass("redborder").addClass("passed");
    var errorLength = 0;
};
myApp.modal({
    title: '恭喜您，获得<span>' + 123 + '</span>',
    text: $("#award-con").html(),
    buttons: [{
        text: '确定',
        onClick: function() {

            var options = {
                // Callback gets called when toast is hidden
                onHide: function() {},
                duration: 9000
            };
            var toast = myApp.toast('领取成功', options);
            toast.show();
        }
    }]
});
$(".modal.modal-in, .modal.modal-out").css({ "margin-left": "-1.72rem" });
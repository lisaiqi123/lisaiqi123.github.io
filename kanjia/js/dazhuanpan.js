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
    textRadius: 120,
    //大转盘奖品位置距离圆心的距离
    insideRadius: 12,
    //大转盘内圆的半径
    startAngle: 0,
    //开始角度
    bRotate: false,
    //控制是否旋转
};

$(function() {
    //关闭弹窗
    $(document).on('click', '.close', function() {
        $("#discription").fadeOut();
        $("#award-con").fadeOut();
        $("#nobegain").fadeOut();
        $("#finished").fadeOut();
        $("#noaward").fadeOut();
        $("#noawardNum").fadeOut();
        $(".model-overlays").fadeOut();
        $('html,body').removeClass('ovfHiden');
    });
    //活动说明
    $$('.alert-guize').on('click', function() {
        model("#discription");
    });
    //点击分享蒙版
    $(document).on('click', ".share-friend", function() {
        $('.share-masked').fadeIn();
        $('html,body').addClass('ovfHiden'); //使网页不可滚动
    });
    $(document).on('click', '.share-masked', function() {
        $('.share-masked').hide();
        $('html,body').removeClass('ovfHiden'); //使网页恢复可滚动
    });
    //我的奖品
    $$('.alert-award').on('click', function() {
        var _th = $(this);
        var url = _th.data('url');
        var openid = _th.data('openid');
        $.post(url, { openid: openid }, function(data) {
            model("#award-con");
            $("#award-con").html(data);
        })
    });
    //获取验证码
    $(document).on("click", "#require-code", function() {
        var checkEle = $(this).parents('.award-layout').find('[data-type="phoneNum"]');
        if (checkAll(checkEle)) {
            var _self = $(this);
            $(".verify-code").focus();
            var time = 60;
            setTime = setInterval(function() {
                if (time <= 0) {
                    _self.text("重新获取");
                    clearInterval(setTime);
                    return;
                }
                time--;
                _self.text(time);
            }, 1000);
            var url = _self.attr('data-href');
            var tel = $('#tel').val();
            $.post(url, { tel: tel }, function(data) {
                $(".verify-code").attr("data-tel", data.trim());
            })
        } else {
            return false;
        }
    });
    //实物奖品点击领取
    $(document).on("click", ".lingqu-award", function() {
        var checkEle = $(this).parents('.award-layout').find('*[data-type]');
        if (checkAll(checkEle)) {
            var openid = $('#openid').val();
            var prizeId = $('#prizedId').val();
            var url = $(this).data('href');
            var name = $('#name').val();
            var tel = $('#phoneNum').val();
            $.post(url, { id: prizeId, openid: openid, name: name, tel: tel }, function() {
                $(".model-overlays").fadeOut();
                $("#get-award").fadeOut();
                $.toast('领取成功');
            })
        } else {
            return false;
        }
    });

    //验证方法
    function checkAll(checkEle) {
        var allLength = checkEle.length,
            errorLength = 0;
        for (var i = 0; i < allLength; i++) {
            var re = checkSingle($(checkEle[i]));
            if (!re[0]) {
                $.toast(re[1]);
                errorLength++;
                return false
            }
        }
        if (errorLength == 0) {
            return true
        }
    }

    function checkSingle(ele) {
        var type = ele.data('type'),
            val = ele.val();
        var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/g;
        switch (type) {
            case 'name':
                if (val.length == 0) {
                    return [false, '请填写用户姓名'];
                } else if (!reg.test(val)) {
                    return [false, '仅支持输入字母和汉字，不支持符号、数字、表情'];
                } else if (val.length > 6) {
                    return [false, '称呼最大为6字符'];
                } else {
                    return [true];
                };
                break;
            case 'phoneNum':
                val = val.trim();
                if (val.length == 0) {
                    return [false, '请填写手机号码'];
                } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
                    return [false, '手机号格式错误'];
                } else {
                    return [true];
                };
                break;
            case 'verify-code':
                var tel = $(".verify-code").attr("data-tel");
                if (length == 0) {
                    return [false, '输入验证码']
                } else if (!(/^\d{6}$/.test(val))) {
                    return [false, '输入正确的验证码']
                } else if (tel === val) {
                    return [true]
                };
                break;
        }
    };

});
window.onload = function() {
    $(".rotate2").animate({
        'width': '4.84rem',
        'height': '4.84rem'
    }, 1300, "swing", function() {
        $("canvas.item").fadeIn();
        $("img.pointer").fadeIn();
    });
    turnplate.restaraunts = ["谢谢参与", "一等奖", "二等奖", "三等奖", "谢谢参与", "四等奖", "五等奖", "六等奖"];
    // turnplate.restaraunts = ["谢谢参与", "一等奖", "二等奖", "三等奖", "四等奖", "五等奖"];
    // turnplate.restaraunts = ["谢谢参与", "一等奖", "红包奖", "二等奖"];
    //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
    drawRouletteWheel("#c50000");
    //旋转转盘 item:奖品位置; txt：提示语;
    var rotateFn = function(item, txt, html, nums) {
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
            duration: 6000,
            callback: function() {
                nums--;
                $("#awardNum").text(nums);
                if (txt.indexOf("谢谢参与") != -1) {
                    model("#noawardNum");
                } else {
                    model("#get-award");
                    $("#get-award").html(html);
                }
                turnplate.bRotate = !turnplate.bRotate;
            }
        });
    };
    //获取抽奖机会
    $(".pointer").click(function() {
        var nums = $("#awardNum").text();
        var status = $(this).data("status");
        var person = $(this).data("person");
        var total = $(this).data("total");
        if (status == 0) {
            model("#nobegain");
        }
        if (status == 2) {
            model("#finished");
        }
        if (status == 1) {
            if (turnplate.bRotate) return;
            if (Number(total) != 0 && Number(person) <= 0) {
                $.toast("参与人数已达上限");
                return;
            }

            if (nums > 0) {
                turnplate.bRotate = !turnplate.bRotate;
                var url = $(this).data('href');
                var share = $('#awardNum').data('share');
                var open = $(this).data('openid')
                    // $.post(url, { share: share, open: open }, function(data) {
                    // var item = data.item; //获取奖品停的位置
                var html = "";
                rotateFn(2, turnplate.restaraunts[1], html, nums);
                // })
            } else {
                $("#awardNum").text(0);
                if ($("#awardNum").data("status") == 0) {
                    //机会为零，没有分享
                    $.toast("抱歉，今日已无抽奖机会~");
                } else {
                    //机会为零，可以分享
                    model("#noaward");
                }
            }
        }
    });
    //旋转转盘 item:奖品位置; txt：提示语;
    var rotateFn = function(item, txt, html, nums) {
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
            duration: 6000,
            callback: function() {
                nums--;
                $("#awardNum").text(nums);
                if (txt.indexOf("谢谢参与") != -1) {
                    model("#noawardNum");
                } else {
                    model("#get-award");
                    $("#get-award").html(html);
                }
                turnplate.bRotate = !turnplate.bRotate;
            }
        });
    };
};

function model(el) {
    $(el).fadeIn();
    $(".model-overlays").fadeIn();
    $('html,body').addClass('ovfHiden');
};

function drawRouletteWheel(textColor) {
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) {
        //根据奖品个数计算圆周角度
        var arc = Math.PI / (turnplate.restaraunts.length / 2);
        var ctx = canvas.getContext("2d");
        //在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, 1200, 1200);
        //背景
        var img = document.getElementById("scream");
        img.width = canvas.width;
        img.height = canvas.height;
        ctx.drawImage(img, 0, 0, 1200, 1200);
        //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
        ctx.strokeStyle = "transparent";
        //font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = "bold 48px PingFang-SC";
        for (var i = 0; i < turnplate.restaraunts.length; i++) {
            var angle = turnplate.startAngle + i * arc;
            ctx.fillStyle = "transparent";
            ctx.beginPath();
            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
            ctx.arc(600, 600, turnplate.outsideRadius, angle, angle + arc, false);
            ctx.arc(600, 600, turnplate.insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            //锁画布(为了保存之前的画布状态)
            ctx.save();
            //----绘制奖品开始----
            ctx.fillStyle = textColor;
            var text = turnplate.restaraunts[i];
            var line_height = -400;
            //translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(600 + Math.cos(angle + arc / 2) * turnplate.textRadius, 600 + Math.sin(angle + arc / 2) * turnplate.textRadius);
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
                text = text.substring(0, 6) + "||" + text.substring(6, 12);
                var texts = text.split("||");
                for (var j = 0; j < texts.length; j++) {
                    if (j == 0) {
                        ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, (j - 30) + line_height);
                    } else {
                        ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, (j + 20) + line_height);
                    }

                }
            } else {
                //在画布上绘制填色的文本。文本的默认颜色是黑色
                //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                ctx.fillText(text, -ctx.measureText(text).width / 2, -400);
            }

            //添加对应图标
            $(".canvas-gift").each(function() {
                if (($(this).index() - 1) == i) {
                    var img = this;
                    if (text.indexOf("一") >= 0) {
                        img.onload = function() {
                            ctx.drawImage(img, -60, -300, 120, 187); // a偏离目前角的位置 b距圆心距离  c宽  d高  -2*a=c
                        };
                        ctx.drawImage(img, -60, -300, 120, 187);
                    } else if (text.indexOf("谢谢") >= 0) {
                        img.onload = function() {
                            ctx.drawImage(img, -75, -300, 150, 150);
                        };
                        ctx.drawImage(img, -75, -300, 150, 150);
                    } else {
                        img.onload = function() {
                            ctx.drawImage(img, -100, -340, 200, 200);
                        };
                        ctx.drawImage(img, -100, -340, 200, 200);
                    }
                }
            })

            //把当前画布返回（调整）到上一个save()状态之前
            ctx.restore();
        }
    }
}
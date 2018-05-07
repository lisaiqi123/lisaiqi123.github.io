var myApp = new Framework7({
    animateNavBackIcon: true, // 动态导航栏中back-link图标iOS风格化
    modalTitle: "提示", // 弹出层默认标题
    modalButtonOk: "确定", // 弹出层默认确定按钮
    modalButtonCancel: "取消", // 弹出层默认取消按钮
    modalCloseByOutside: false // 点击modal外部关闭弹出层
});
var $$ = Dom7;
// 滚动加载更多
var page = 2;
var loading = false;
if (($('.js-load-more').height() - 88) >= $(".infinite-scroll").height()) {
    $('.infinite-down-scroll').addClass('active');
}
$(".infinite-scroll").off("scroll").on("scroll", function(e) {
    if ((this.scrollHeight - $(this).height() - 100) <= $(this).scrollTop()) {
        // 正在加载或已加载全部，则退出
        if (loading) return;
        loading = true;
        $('.infinite-down-scroll').removeClass('active');
        $('.infinite-scroll-preloader').addClass('active');
        var n = window.location.search;
        var url = window.location.href;
        if (url.indexOf("?") != -1) {
            url = url + '&page=' + page;
        } else {
            url = url + '?page=' + page
        }
        $.get(url, function(html) {
            $('.infinite-scroll-preloader').removeClass('active');
            if (html.length > 0) {
                loading = false;
                $(".js-load-more").append(html);
                page++;
            } else {
                $('.infinite-scroll').append('<div class="site-over"><p><span>完</span>哥，这回真没了</p></div>');
                return;
            }
        })
    }
});
//付款倒计时
if ($("#time").length != 0) {
    checktime();
}

function checktime() {
    //下单时间
    var payStartTime = $('#time').attr('data-time');
    if (payStartTime > 0) {
        window.timer1 = window.setInterval(function() {
            payStartTime--
            var finishTime = getCostTime(payStartTime);
            $('#time').html('活动还剩 ' + finishTime + ' 结束，赶快分享吧！');
            if (payStartTime <= 0) {
                window.clearInterval(window.timer1);
            }
        }, 1000);
    }
}

function getCostTime(time) {
    var day = parseInt(time / 86400);
    var hour = parseInt((time - day * 86400) / 3600);
    var minute = parseInt((time - day * 86400 - hour * 3600) / 60);
    var s = parseInt(time % 60);
    // var string_description = day > 0 ? "<span>" + toDouble(day) + "</span>:" : "<span>00</span>:";
    var string_description = hour > 0 ? "<span>" + toDouble(hour) + "</span> : " : "<span>00</span> : ";
    string_description += minute > 0 ? "<span>" + toDouble(minute) + "</span> : " : "<span>00</span> : ";
    string_description += s > 0 ? "<span>" + toDouble(s) + "</span>" : "<span>00</span>";
    return string_description;
}
//将单位数前面加0
function toDouble(x) {
    if (x < 10) {
        return "0" + x;
    } else { return x; }
};
//关闭按钮
$(document).on("click", ".close-btn", function() {
    myApp.closeModal();
});
//点击遮罩
$(document).on("click", ".modal-overlay-click", function() {
    $(".modal-overlay.modal-overlay-visible").removeClass("modal-overlay-click");
    myApp.closeModal();
});
//我的奖品
$$('.myAward,.look_award').on('click', function() {
    myApp.modal({
        title: '我的奖品<i class="icon icon-saasguanbi close-btn"></i>',
        text: $("#template1").html(),
        buttons: []
    })
    $(".modal-overlay.modal-overlay-visible").addClass("modal-overlay-click");
});
//活动规则
$$('.alert-guize').on('click', function() {
    myApp.modal({
        title: '活动规则<i class="icon icon-saasguanbi close-btn"></i>',
        text: $("#guize").val(),
        buttons: []
    })
    $(".modal-overlay.modal-overlay-visible").addClass("modal-overlay-click");
});

//奖品一览
$$('.awrad-list').on('click', function() {
    myApp.modal({
        title: '奖品一览<i class="icon icon-saasguanbi close-btn"></i>',
        text: $("#template2").html(),
        buttons: []
    })
    $(".modal-overlay.modal-overlay-visible").addClass("modal-overlay-click");
});
//立即领取
$$('.chaikai').on('click', function() {
    var type = $(this).data("type");
    var html;
    if (type == 0) {
        html = $("#template3").html();
    } else {
        html = $("#template4").html();
    }
    myApp.modal({
        title: '',
        text: html,
        buttons: []
    })
});
//马上分享
$$('.share,.find_help').on('click', function() {
    myApp.modal({
        title: '',
        text: $("#template0").html(),
        buttons: []
    })
    $(".modal-overlay.modal-overlay-visible,.modal").addClass("modal-overlay-click");
});
//领取
$(document).on("click", ".ling-btn", function() {
    myApp.closeModal();
    // window.location.reload();
});
//帮她拆开
$(".help_her").on("click", function() {
    var options = {
        onHide: function() {
            window.location.reload();
        },
        duration: 1000 // Hide toast after 2 seconds
    };
    var toast = myApp.toast('帮他拆开', '<div></div>', options);
    toast.show();
})
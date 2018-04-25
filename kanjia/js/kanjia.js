var myApp = new Framework7({
    animateNavBackIcon: true, // 动态导航栏中back-link图标iOS风格化
    modalTitle: "提示", // 弹出层默认标题
    modalButtonOk: "确定", // 弹出层默认确定按钮
    modalButtonCancel: "取消", // 弹出层默认取消按钮
    modalCloseByOutside: true // 点击modal外部关闭弹出层
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
            $('#time').text(finishTime);
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
    var string_description = day > 0 ? toDouble(day) + ":" : "00:";
    string_description += hour > 0 ? toDouble(hour) + ":" : "00:";
    string_description += minute > 0 ? toDouble(minute) + ":" : "00:";
    string_description += s > 0 ? toDouble(s) : "00";
    return string_description;
}
//将单位数前面加0
function toDouble(x) {
    if (x < 10) {
        return "0" + x;
    } else { return x; }
};
//活动规则弹窗
$$('.alert-guize').on('click', function() {
    myApp.modal({
        title: '活动规则',
        text: $("#guize").val(),
        buttons: [{
            text: '确定',
            onClick: function() {
                window.location.reload();
            }
        }]
    })
});

//现在就要弹窗
$$('.right-now').on('click', function() {
    myApp.modal({
        title: '',
        text: $("#tempalte3").html(),
        buttons: [{
            text: $("#tempalte4").html(),
        }, {
            text: '继续砍价',
            close: true,
        }]
    })
});
//分享给好友再多砍一刀
$$('.kan-more').on('click', function() {
    myApp.modal({
        afterText: $("#tempalte2").html(),
    })
});
//帮朋友砍一刀弹窗
$$('.help-kan').on('click', function() {
    myApp.modal({
        title: '',
        text: $("#tempalte5").html(),
        buttons: [{
            text: '确定',
            close: true,
        }]
    })
});
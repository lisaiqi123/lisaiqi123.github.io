(function() {
    //cwzs3-----自定义旋转
    $('.cwzs3-2').on('inview.scrollspy.amui', function() {
        $(this).children().addClass("animate");
    }).on('outview.scrollspy.amui', function() {
        $(this).children().removeClass("animate");
    });
    //7步轮播
    function step(swiper_activeIndex) {
        $(".step-com").each(function() {
            $(this).removeClass("active");
            if ($(this).index() == swiper_activeIndex) {
                $(this).addClass("active");
            }
        })
    }
    var initSwiper = {
        direction: 'horizontal',
        initialSlide: 0,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        // 切换页面成功之前的回调
        onSlideChangeStart: function(swiper) {
            if (swiper.activeIndex == 0) {
                $(".swiper-container-son .swiper-slide").each(function() {
                    $(this).addClass("visibility");
                    $(".swiper-container-son1 .swiper-slide").removeClass("visibility");
                })
                step(swiper.activeIndex);
                swiperSon1.slideTo(0);
                swiperSon1.startAutoplay();
                swiperSon2.stopAutoplay();
                swiperSon3.stopAutoplay();
                swiperSon4.stopAutoplay();
                swiperSon5.stopAutoplay();
                swiperSon6.stopAutoplay();
                swiperSon7.stopAutoplay();
            }
            if (swiper.activeIndex == 1) {
                $(".swiper-container-son .swiper-slide").each(function() {
                    $(this).addClass("visibility");
                    $(".swiper-container-son2 .swiper-slide").removeClass("visibility");
                })
                step(swiper.activeIndex);
                swiperSon2.slideTo(0);
                swiperSon1.stopAutoplay();
                swiperSon2.startAutoplay();
                swiperSon3.stopAutoplay();
                swiperSon4.stopAutoplay();
                swiperSon5.stopAutoplay();
                swiperSon6.stopAutoplay();
                swiperSon7.stopAutoplay();
            }
            if (swiper.activeIndex == 2) {
                $(".swiper-container-son .swiper-slide").each(function() {
                    $(this).addClass("visibility");
                    $(".swiper-container-son3 .swiper-slide").removeClass("visibility");
                })
                step(swiper.activeIndex);
                swiperSon3.slideTo(0);
                swiperSon1.stopAutoplay();
                swiperSon2.stopAutoplay();
                swiperSon3.startAutoplay();
                swiperSon4.stopAutoplay();
                swiperSon5.stopAutoplay();
                swiperSon6.stopAutoplay();
                swiperSon7.stopAutoplay();
            }
            if (swiper.activeIndex == 3) {
                $(".swiper-container-son .swiper-slide").each(function() {
                    $(this).addClass("visibility");
                    $(".swiper-container-son4 .swiper-slide").removeClass("visibility");
                })
                step(swiper.activeIndex);
                swiperSon4.slideTo(0);
                swiperSon1.stopAutoplay();
                swiperSon2.stopAutoplay();
                swiperSon3.stopAutoplay();
                swiperSon4.startAutoplay();
                swiperSon5.stopAutoplay();
                swiperSon6.stopAutoplay();
                swiperSon7.stopAutoplay();
            }
            if (swiper.activeIndex == 4) {
                $(".swiper-container-son .swiper-slide").each(function() {
                    $(this).addClass("visibility");
                    $(".swiper-container-son5 .swiper-slide").removeClass("visibility");
                })
                step(swiper.activeIndex);
                swiperSon5.slideTo(0);
                swiperSon1.stopAutoplay();
                swiperSon2.stopAutoplay();
                swiperSon3.stopAutoplay();
                swiperSon4.stopAutoplay();
                swiperSon5.startAutoplay();
                swiperSon6.stopAutoplay();
                swiperSon7.stopAutoplay();
            }
            if (swiper.activeIndex == 5) {
                $(".swiper-container-son .swiper-slide").each(function() {
                    $(this).addClass("visibility");
                    $(".swiper-container-son6 .swiper-slide").removeClass("visibility");
                })
                step(swiper.activeIndex);
                swiperSon6.slideTo(0);
                swiperSon1.stopAutoplay();
                swiperSon2.stopAutoplay();
                swiperSon3.stopAutoplay();
                swiperSon4.stopAutoplay();
                swiperSon5.stopAutoplay();
                swiperSon6.startAutoplay();
                swiperSon7.stopAutoplay();
            }
            if (swiper.activeIndex == 6) {
                $(".swiper-container-son .swiper-slide").each(function() {
                    $(this).addClass("visibility");
                    $(".swiper-container-son7 .swiper-slide").removeClass("visibility");
                })
                step(swiper.activeIndex);
                swiperSon7.slideTo(0);
                swiperSon1.stopAutoplay();
                swiperSon2.stopAutoplay();
                swiperSon3.stopAutoplay();
                swiperSon4.stopAutoplay();
                swiperSon5.stopAutoplay();
                swiperSon6.stopAutoplay();
                swiperSon7.startAutoplay();
            }
        },
        onSlideChangeEnd: function(swiper) {
            swiperFather.update(); //swiper更新
        }
    };
    var swiperFather = new Swiper('.swiper-container-father', initSwiper);
    var swiperSon1 = new Swiper('.swiper-container-son1', {
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        lazyLoading: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        onTouchEnd: function(swiper) {
            if (swiper.activeIndex == $(".swiper-container-son1 .swiper-slide").length - 1) {
                if (swiperSon1.swipeDirection == 'next') {
                    swiperFather.slideTo(1);
                    swiperSon2.slideTo(0);
                }
            }
        },
    });
    var swiperSon2 = new Swiper('.swiper-container-son2', {
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        lazyLoading: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        onTouchEnd: function(swiper) {
            if (swiper.activeIndex == $(".swiper-container-son2 .swiper-slide").length - 1) {
                if (swiperSon2.swipeDirection == 'next') {
                    swiperFather.slideTo(2);
                    swiperSon3.slideTo(0);
                }
            } else if (swiper.activeIndex == 0) {
                if (swiperSon2.swipeDirection == 'prev') {
                    swiperFather.slideTo(0);
                    swiperSon1.slideTo($(".swiper-container-son1 .swiper-slide").length - 1);
                }
            }
        },
    });
    var swiperSon3 = new Swiper('.swiper-container-son3', {
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        lazyLoading: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        onTouchEnd: function(swiper) {
            if (swiper.activeIndex == $(".swiper-container-son3 .swiper-slide").length - 1) {
                if (swiperSon3.swipeDirection == 'next') {
                    swiperFather.slideTo(3);
                    swiperSon4.slideTo(0);
                }
            } else if (swiper.activeIndex == 0) {
                if (swiperSon3.swipeDirection == 'prev') {
                    swiperFather.slideTo(1);
                    swiperSon2.slideTo($(".swiper-container-son2 .swiper-slide").length - 1);
                }
            }
        },
    });
    var swiperSon4 = new Swiper('.swiper-container-son4', {
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        lazyLoading: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        onTouchEnd: function(swiper) {
            if (swiper.activeIndex == $(".swiper-container-son4 .swiper-slide").length - 1) {
                if (swiperSon4.swipeDirection == 'next') {
                    swiperFather.slideTo(4);
                    swiperSon5.slideTo(0);
                }
            } else if (swiper.activeIndex == 0) {
                if (swiperSon4.swipeDirection == 'prev') {
                    swiperFather.slideTo(2);
                    swiperSon3.slideTo($(".swiper-container-son3 .swiper-slide").length - 1);
                }
            }
        },
    });
    var swiperSon5 = new Swiper('.swiper-container-son5', {
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        lazyLoading: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        onTouchEnd: function(swiper) {
            if (swiper.activeIndex == $(".swiper-container-son5 .swiper-slide").length - 1) {
                if (swiperSon5.swipeDirection == 'next') {
                    swiperFather.slideTo(5);
                    swiperSon6.slideTo(0);
                }
            } else if (swiper.activeIndex == 0) {
                if (swiperSon5.swipeDirection == 'prev') {
                    swiperFather.slideTo(3);
                    swiperSon4.slideTo($(".swiper-container-son4 .swiper-slide").length - 1);
                }
            }
        },
    });
    var swiperSon6 = new Swiper('.swiper-container-son6', {
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        lazyLoading: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        onTouchEnd: function(swiper) {
            if (swiper.activeIndex == $(".swiper-container-son6 .swiper-slide").length - 1) {
                if (swiperSon6.swipeDirection == 'next') {
                    swiperFather.slideTo(6);
                    swiperSon4.slideTo(0);
                }
            } else if (swiper.activeIndex == 0) {
                if (swiperSon6.swipeDirection == 'prev') {
                    swiperFather.slideTo(4);
                    swiperSon5.slideTo($(".swiper-container-son5 .swiper-slide").length - 1);
                }
            }
        },
    });
    var swiperSon7 = new Swiper('.swiper-container-son7', {
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        lazyLoading: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        onTouchEnd: function(swiper) {
            if (swiper.activeIndex == 0) {
                if (swiperSon7.swipeDirection == 'prev') {
                    swiperFather.slideTo(5);
                    swiperSon6.slideTo($(".swiper-container-son6 .swiper-slide").length - 1);
                }
            }
        },
    });
    swiperSon1.startAutoplay();
    swiperSon2.stopAutoplay();
    swiperSon3.stopAutoplay();
    swiperSon4.stopAutoplay();
    swiperSon5.stopAutoplay();
    swiperSon6.stopAutoplay();
    swiperSon7.stopAutoplay();

    //成功落地案例
    var cwzs5_Swiper = new Swiper('.cwzs5-swiper-container', {
        direction: 'horizontal',
        pagination: '.cwzs5-swiper-pagination',
        lazyLoading: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        loop: true,
    });
    //公司优势
    var cwzs6_Swiper = new Swiper('.cwzs6-swiper-container', {
        direction: 'horizontal',
        pagination: '.cwzs6-swiper-pagination',
        lazyLoading: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        loop: true,
    });

    // 招募品牌轮播
    var swiper_rem5 = new Swiper('#bus-brand .swiper-container', {
        autoplay: 2000,
        speed: 500,
        lazyLoading: true,
        autoplayDisableOnInteraction: false,
        pagination: '#bus-brand .swiper-pagination',
        loop: true,
    });

    //城市选择
    var region = {};
    region.getRegion = function getRegion(parent_id, ele) {
        var region_id = arguments[2] ? arguments[2] : '';
        $.get("/base/region", { parent_id: parent_id }, function(data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].id + '"';
                if (region_id == data[i].id) html += ' selected="selected"';
                html += '>' + data[i].region_name + '</option>';
            }
            $("." + ele).append(html);
        }, 'json');
    }
    $('body').on('change', '.province', function() {
        var parent_id = $(this).val();
        $(".city").html("<option value=''>请选择</option>");
        $(".district").html("<option value=''>请选择</option>");
        region.getRegion(parent_id, 'city');
    });
    $('body').on('change', '.city', function() {
        var parent_id = $(this).val();
        $(".district").html("<option value=''>请选择</option>");
        region.getRegion(parent_id, 'district');
    });
    s();

    function s() {
        var province = $(".province").attr("data-id");
        var city = $(".city").attr("data-id");
        var district = $(".district").attr("data-id");
        if (province == null || province == '' && city == null || city == '') {
            region.getRegion(1, 'province');
        } else {
            region.getRegion(1, 'province', province);
            region.getRegion(province, 'city', city);
            region.getRegion(city, 'district', district);
        }
    }

    //提交申请
})()
/*
* @Author: name
* @Date:   2018-01-26 15:29:21
* @Last Modified by:   name
* @Last Modified time: 2018-02-03 09:28:33
*/

$(function(){
    var swiper = new Swiper('.contentBg', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
                disableOnInteraction: false,
            },
    });
    //服务领域
    var mySwiper = new Swiper('.display', {
      slidesPerView: 4,
      spaceBetween: 50,
      // init: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {

        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 1,
          spaceBetween: 10,
        }
      }
    });

    $(window).resize(function(){
      if($('.display .swiper-pagination span').length==1){
        $('.display .swiper-pagination').css('display', 'none');
      }else{
        $('.display .swiper-pagination').css('display', 'block');
      }

    });
    //网站建设
    var websizeSwiper = new Swiper('.cmsContainer', {
        on: {
      slideChangeTransitionEnd: function(){
        $('.websizeB>button').eq(this.activeIndex).css({
            'background': '#e61520',
            'color':'#ffffff',
            'border-radius':'4px'
          }).siblings().css({
            'background': '#e9e9e9',
            'color':'#333333'
          });
      },
  },
    });
    $('.websizeB>button').each(function() {
        $(this).click(function(){
          $(this).css({
            'background': '#e61520',
            'color':'#ffffff',
            'border-radius':'4px'
          }).siblings().css({
            'background': '#e9e9e9',
            'color':'#333333'
          });
        websizeSwiper.slideTo($(this).index(),500,false)

        });
    });
    //服务优势
    var advSwiper = new Swiper('.adv', {
      slidesPerView: 5,
      spaceBetween: 40,
      // init: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        }
      }
    });
    $(window).resize(function(){
      if($('.adv .swiper-pagination span').length==1){
        console.log($('.display .swiper-pagination span').length);
        $('.adv .swiper-pagination').css('display', 'none');
      }else{
        $('.adv .swiper-pagination').css('display', 'block');
      }

    });
    //合作伙伴
    $('.partner dl dt').hover(function() {
      $(this).stop().animate({top: '-140px'},500);
    },
      function () {
        $(this).stop().animate({top: '0'},500);
      }
    );

    // 案例页面
    // 客户案例
    var customerSwiper = new Swiper('.customerSwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      // keyboard: {
      //   enabled: true,
      // },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    for (var i = 0; i <21; i++) {
      $('.customerImg .swiper-pagination-bullet').eq(i).html(i+1);
    };
    //案例详情页面轮播
     var detailsSwiper = new Swiper('.detailsSlide', {
      slidesPerView: 3,
      spaceBetween: 5,
      // slidesPerGroup: 3,
      // loop: true,
      // loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });

    var swiper = new Swiper('.bigImg', {
      autoHeight: true, //enable auto height
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

     //全网营销按钮
     $('.allWebsize button').each(function() {
      $(this).click(function(event) {
        $(this).css({
          'color':'#ffff',
          'background':'#e5000c'
        }).siblings().css({
          'color':'#333333',
          'background':'#ffff'
        });;
      });
     });
     //全网营销合作关系轮播
     var relativeSwiper = new Swiper('.relativeDetails', {
        on: {
        slideChangeTransitionEnd: function(){
          $('.relative .row li').eq(this.activeIndex).css({
            'border-bottom': '0',
            'border-top':'2px solid #e5000c'
          }).siblings().css({
            'border-bottom': '1px solid #e2e2e2',
            'border-top':'0'
          });
        },
      },
    });
     $('.relative .row li').each(function(){
        $(this).click(function() {
          $(this).css({
            'border-bottom': '0',
            'border-top':'2px solid #e5000c'
          }).siblings().css({
            'border-bottom': '1px solid #e2e2e2',
            'border-top':'0'
          });
          relativeSwiper.slideTo($(this).index(),500,false)
        });
     })
    // 十大理由
    // 鼠标放在li上的动画效果
    $('.reason .reasons li').each(function() {
        $(this).hover(function() {
          //li
          $(this).css({
          'border':'1px solid #ea303a'
        }).siblings().css({
          'border': '0'
        });
        //imageBox
        $(this).find('.imageBox').css({
          'padding':'0',
          'border':'0',
        })
        //p2
        $(this).find('.p2').stop().animate({
          height: "+70px",
        },'slow');
        //p1
        $(this).find('.p1').css('margin-top', '0');
        }, function() {
          //li
          $(this).css({
          'border':'0'
        })
          //imageBox
          $(this).find('.imageBox').css({
            'padding':'16px 0',
            'border':'1px solid #eeeeee'
          })
          //p2
          $(this).find('.p2').stop().animate({
          height: "40px",
        },);
          //p1
          $(this).find('.p1').css('margin-top', '30px');
        });
    });
    //易站通案例
    var standSwiper = new Swiper('.standCase', {
      slidesPerView: 3,
      spaceBetween: 20,
      // init: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1040: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        600: {
          slidesPerView: 1,
          spaceBetween: 10,
        }
      }
    });
    $(window).resize(function(){
      if($('.standCase .swiper-pagination span').length==1){
        $('.standCase .swiper-pagination').css('display', 'none');
      }else{
        $('.standCase .swiper-pagination').css('display', 'block');
      }

    });

    //网站建设
    var buildSwiper = new Swiper('.buildSwiper', {
      slidesPerView: 5,
      spaceBetween: 6,
      // init: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1040: {
          slidesPerView: 4,
          spaceBetween: 4,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 4,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 4,
        }
      }
    });
    $(window).resize(function(){
      if($('.buildSwiper .swiper-pagination span').length==1){
        $('.buildSwiper .swiper-pagination').css('display', 'none');
      }else{
        $('.buildSwiper .swiper-pagination').css('display', 'block');
      }

    });
    // 鼠标放上去改变top值
    $('.buildSwiper .pcSlide').hover(function() {
        $(this).find('.up').stop().animate({top: '0'},500);
    }, function() {
      $(this).find('.up').stop().animate({top: '100%'},500);
    });
    //最新案例
    $('.newestCase .newCase dl dt').hover(function() {
      $(this).find('p').stop().animate({top: '0'},200);

    }, function() {
      $(this).find('p').stop().animate({top: '160px'},200);
    });
    //合作流程
    // 点击dl的dt dd显示
    $('.procedure .list dl dt').each(function() {
      $(this).click(function() {
        $(this).nextAll().slideToggle("500");
      });
    });
    //seo全解析，同上
    $('.analysis .list dl dt').each(function() {
      $(this).click(function() {
        $(this).nextAll().slideToggle("500");
      });
    });

    //小程序页面
    //we1的样式
    var programSwiper = new Swiper('.programSwiper', {
      slidesPerView: 4,
      spaceBetween: 50,
      // init: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1040: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
        600: {
          slidesPerView: 1,
          spaceBetween: 50,
        }
      }
    });
    $(window).resize(function(){
      if($('.program .swiper-pagination span').length==1){
        $('.program .swiper-pagination').css('display', 'none');
      }else{
        $('.program .swiper-pagination').css('display', 'block');
      }

    });
    //三种主流注册模式轮播
    var patternSwiper = new Swiper('.patternSwiper', {
      slidesPerView: 3,
      spaceBetween: 240,
      // init: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1170: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
        1070: {
          slidesPerView: 2,
          spaceBetween: 100,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        600: {
          slidesPerView: 1,
          spaceBetween: 50,
        }
      }
    });
    $(window).resize(function(){
      if($('.pattern .swiper-pagination span').length==1){
        $('.pattern .swiper-pagination').css('display', 'none');
      }else{
        $('.pattern .swiper-pagination').css('display', 'block');
      }

    });
    //新闻页面
    var newsSwiper = new Swiper('.dynamicSwiper', {
      pagination:{
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    // 新闻列表按钮
    $('.newsList .newsBtn button').click(function(){
      $(this).css({
        'background':'#e5000c',
        'color':'#ffffff'
      }).siblings().css({
        'background':'0',
        'color':'#333333'
      });;
    });
    var newlistSwiper = new Swiper('.newslistS', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    });
})
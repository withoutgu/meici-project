$(function(){
    //头部购物袋下拉效果
    $('header').on('mouseenter','.pull',function(){
        $('.pulldown').show();
        $('.pullcontent').show();
    }).on('mouseleave','.pull',function(){
        $('.pulldown').hide();
        $('.pullcontent').hide();

    })
    //头部关注效果
    $('.star').on('mouseenter',function(){
        $('.stardown').show();
    }).on('mouseleave',function(){
        $('.stardown').hide();
    })
    
    //顶部搜索显现
    $(window).scroll(function(){
        if($(window).scrollTop()>200){
            $('.top').fadeIn();
        }else{
            $('.top').fadeOut();
        }
        $('.top').offset({top:$(window).scrollTop()});
    })
    
    //时尚导购居中
//    var $oLeft = $('.carousel').offset().left;
//    console.log($oLeft);
    $('.tipcontent').offset({left:-865});
    
    //时尚导购显现
    $('.fashionTip').on('mouseenter',function(){
        $('.tipcontent').show();
    }).on('mouseleave',function(){
        $('.tipcontent').hide();
    })
    
    //导航标签切换
    $('nav').children('article').hide();
    $('nav').on('mouseenter','.navli',function(){
        $(this).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
        var $idx = $(this).index();
        console.log($idx);
        $('nav').children('article').eq($idx-1).show().siblings('article').hide();
    }).on('mouseleave',function(){
        $(this).find('a').removeClass('active');
        $('nav').children('article').hide();
    })
    $('nav').on('mouseenter','.navnull',function(){  $(this).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
        $('nav').children('article').hide();
    })
    //回到顶部
    $('.totop').on('click',function(){
        $('body').animate({scrollTop:0})
    })
})
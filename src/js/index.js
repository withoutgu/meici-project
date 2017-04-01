requirejs(['config'],function(){
    requirejs(['jquery','myCarousel','cm'],function($){
        //引入侧栏
        $('.sidebar').load('html/sidebar.html',function(){
            $('.sidelist').appendTo($('.sidebar'));
        })
        //引入头部搜索
        $('.top').load('html/topsearch.html',function(){
            $('.topsearch').appendTo($('.top'));
        })
        //引入头部html
        $('#header').load('html/header.html',function(){
            $('header').appendTo($('#header'));
        })
        //引入banner html
        $('#banner').load('html/banner.html',function(){
            $('.banner').appendTo($('#banner'));
        })
        //引入导航html
        $('nav').load('html/nav.html',function(){
            $('.nav').appendTo($('nav'));
        })
        //引入尾部
        $('footer').load('html/footer.html',function(){
            $('.footer').appendTo($('footer'));
        })
        console.log(111);
        //正被选购轮播
        var $bsUl = $('.bscContent');
        var $bsLen = $bsUl.children().length;
        var $bsWidth = $bsUl.children().width();
        console.log($bsWidth);
        $bsUl.width($bsLen*$bsWidth);
        var bsidx = 0;
        var bsshow = function(){
            if(bsidx>$bsLen-5){
                bsidx = 0;
                $bsUl.offset({left:0});
            }else if(bsidx<0){
                bsidx = $bsLen-5;
                console.log($bsUl.offset().left)
            }
            $bsUl.animate({left:-bsidx*$bsWidth})
            
        }
        $('.bsPrev').click(function(){
            bsidx--;
            bsshow();
        })
        $('.bsNext').click(function(){
            bsidx++;
            bsshow();
        })
        var timer;
        var bsauto = function(){
            timer = setInterval(function(){
                bsshow();
                bsidx++;
                console.log(bsidx)
            },3000)
        }
        bsauto();
        $('.bsCarousel').on('mouseenter',function(){
            console.log(111)
            clearInterval(timer);
        }).on('mouseleave',function(){
            bsauto();
        })
        
        //轮播插件使用
        $('.carousel').testcarousel({
            imgList:["http://localhost/meici/img/c1.jpg","http://localhost/meici/img/c2.jpg","http://localhost/meici/img/c3.jpg","http://localhost/meici/img/c4.jpg","http://localhost/meici/img/c5.jpg"],
            width:960,
            height:500,
            smallImg:false
        })
    })
})
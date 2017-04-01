requirejs(['config'],function(){
    requirejs(['jquery','myCarousel','cm'],function($){
        //引入头部html
        $('#header').load('header.html',function(){
            $('header').appendTo($('#header'));
        })
        //引入banner html
        $('#banner').load('banner.html',function(){
            $('.banner').appendTo($('#banner'));
        })
        //引入尾部
        $('footer').load('footer.html',function(){
            $('.footer').appendTo($('footer'));
        })
    })
})
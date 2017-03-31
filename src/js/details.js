requirejs(['config'],function(){
    requirejs(['jquery','myCarousel','cm'],function($){
        
        
        //引入头部html
        $('#header').load('../html/header.html',function(){
            $('header').appendTo($('#header'));
        })
        
        
    })
})
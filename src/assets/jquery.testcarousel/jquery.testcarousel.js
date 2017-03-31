;(function($){
    $.fn.testcarousel = function(obj){
        var defaults = {
            imgList:[],
            width:810,
            height:320,
            type:'horizontal',//fade:淡入淡出, vertial:垂直滚动(默认), horizontal:水平滚动, show:幻灯片
            autoPlay:true,
            page:'right',//left center
            smallImg:true,
            button:true,
            duration:1000,
            idx:1
        }
        
        var opt = $.extend({},defaults,obj);
        
        return this.each(function(){
            var $self = $(this);
            var len = opt.imgList.length;
            var $bigImg;
            var $smallImg;
            var $page;
            var $copyLen;
            
            init();
            var timer = setInterval(autoPlay,3000);
            
            function init(){
                //生成大图轮播
                $self.addClass('testcarousel').height(opt.height).width(opt.width);
                var $imghtml = opt.imgList.map(function(url,idx){
                    return `<li><a href="#"><img src="${url}"></a></li>`
                }).join('\n')
                
                $bigImg = $('<ul/>').html($imghtml).addClass('big').appendTo($self);
                
                //复制首尾两张图用于无缝
                var $copyFirst = $bigImg.find('li').eq(0).clone(true);
                var $copyLast = $bigImg.find('li').eq(len-1).clone(true);
                
                $copyFirst.appendTo($bigImg);
                $bigImg.find('li').eq(0).before($copyLast);
                
                $copyLen = $bigImg.children().length;
                
                    
                //播放方向
                if(opt.type==='horizontal'){
                    $bigImg.find('li').addClass('horizontal');
                    $bigImg.width(opt.width*$copyLen);
                    $bigImg[0].style.left = -opt.width+'px';
                }else{
                    $bigImg[0].style.top = -opt.height+'px';
                }
                
                
                //生成前进后退按钮
                var $prev = $('<span/>').addClass('prev').appendTo($self);
                var $next = $('<span/>').addClass('next').appendTo($self);
                
                //生成分页
                var $pagehtml = opt.imgList.map(function(url,idx){
                    return `<span>${idx+1}</span>`;
                }).join('\n')
                $page = $('<div/>').html($pagehtml).addClass('page').appendTo($self);
                $page.find('span').eq(0).addClass('active');
                
                //生成小图
                var $smallhtml = opt.imgList.map(function(url,idx){
                    return `<li><img src="${url}" width=${opt.width/(len)}></li>`
                }).join('\n')
                $smallImg = $('<ul/>').html($smallhtml).addClass('smallImg').appendTo('body');
                $smallImg[0].style.cssText = `width:${opt.width}px;left: 50%;margin-left:${-opt.width/2}px`;
                $smallImg.find('li').eq(0).addClass('active')
                
                //按钮的显示隐藏
                if(opt.button){
                    $self.on('mouseenter',function(){
                        $('.prev').fadeIn();
                        $('.next').fadeIn()
                    }).on('mouseleave',function(){
                        $('.prev').fadeOut();
                        $('.next').fadeOut()
                    })
                }
                
                //分页的位置
                var pWidth = $page.width();
                switch (opt.page){
                    case 'center':$page[0].style.cssText+=`left:50%;margin-left:${-pWidth/2}px;`;break;
                    case 'left':$page[0].style.cssText+=`left:10px;`;break;
                    case 'right':$page[0].style.cssText+=`right:10px;`;break;
                }
                
                //小图的显示隐藏
                if(opt.smallImg){
                    $smallImg.show();
                }
                
                //鼠标进入暂停
                $self.on('mouseenter',function(){
                    clearInterval(timer);
                }).on('mouseleave',function(){
                    timer = setInterval(autoPlay,3000);
                })
                
                //点击前进后退
                $self.on('click','span',function(e){
                    if(e.target.className === 'prev'){
                        opt.idx--;
                        if(opt.idx<1){
                            if(opt.type === 'horizontal'){
                                $bigImg[0].style.left=-opt.width*($copyLen-1)+'px';
                            }else{
                                $bigImg[0].style.top=-opt.height*($copyLen-1)+'px';
                            }
                            opt.idx = $copyLen-2;
                        }
                        showPic(opt.idx);
                        console.log(opt.idx)
                    }else if(e.target.className === 'next'){
                        opt.idx++;
                        if(opt.idx>$copyLen-1){
                            if(opt.type === 'horizontal'){
                                $bigImg[0].style.left=-opt.width+'px';
                            }else{
                                $bigImg[0].style.top=-opt.height+'px';
                            }
                            opt.idx = 2;
                        }
                        console.log(opt.idx)
                        showPic(opt.idx);
                    }
                })
                
                //点击分页
                $page.on('click','span',function(){
                    opt.idx = $(this).html();
                    showPic(opt.idx);
                })
                
                //点击小图
                $smallImg.on('click','li',function(){
                    opt.idx = ($(this).index())+1;
                    showPic(opt.idx);
                })
                
            }
            
            //自动播放
            function autoPlay(){
                opt.idx++;
                if(opt.idx<1){
                    opt.idx = $copyLen-2;
                    if(opt.type === 'horizontal'){
                        $bigImg[0].style.left=-opt.width*($copyLen-1)+'px';
                    }else{
                        $bigImg[0].style.top=-opt.height*($copyLen-1)+'px';
                    }
                    
                }else if(opt.idx>$copyLen-1){
                    opt.idx = 2;
                    if(opt.type === 'horizontal'){
                        $bigImg[0].style.left=-opt.width+'px';
                    }else{
                        $bigImg[0].style.top=-opt.height+'px';
                    }
                    
                }
                showPic(opt.idx);
            }
            
            //播放方式
            function showPic(idx){
                if(opt.type === 'horizontal'){
                    $bigImg.animate({left:-opt.idx*opt.width})
                }else if(opt.type === 'vertial'){
                    $bigImg.animate({top:-opt.idx*opt.height})
                }else if(opt.type ==='show'){
                    $bigImg.offset({top:-opt.idx*opt.height})
                }else if(opt.type === 'fade'){
                    $bigImg.find('li').eq(idx).fadeOut('fast');
                    $bigImg.offset({top:-opt.idx*opt.height});
                    $bigImg.find('li').eq(idx).fadeIn('fast');
                }
                
                //分页高亮
                if(idx>$copyLen-2){
                    $page.find('span').eq(0).addClass('active').siblings().removeClass('active');
                    $smallImg.find('li').eq(0).addClass('active').siblings().removeClass('active');
                }
                $page.find('span').eq(idx-1).addClass('active').siblings().removeClass('active');
                
                //小图高亮
                $smallImg.find('li').eq(idx-1).addClass('active').siblings().removeClass('active');
            }
            
            
        })
    }
})(jQuery);
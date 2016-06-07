$(document).ready(function () {
    // Toggle menu: may or may not use
    // var showMenu = false;
    // var toggleMenu = function(){
    //     if(!showMenu) {
    //       $(".nav-ul").show();
    //       $("body").offset({left: -200});
    //     } else {
    //       $("body").offset({left: 0});
    //       $(".nav-ul").hide();
    //     }
    //     showMenu = !showMenu;
    // };
    // $(".menu-button").click(toggleMenu);

    // write JSON data into DOM
    var jsonToDOM = function (json, prop, el, thumbClass) {
        var dataToLoad = json[prop];
        var targetEl = el;
        for(var i = 0; i < dataToLoad.length; i++){
            var targetContent = dataToLoad[i];
            if(i !== 0){
                targetEl = el.clone().removeAttr("id");
                el.parent().append(targetEl);
            }
            for(var key in targetContent){
                if(thumbClass && key === "thumbnail"){
                    targetEl.children()
                        .find("." + thumbClass)
                        .css("background", "url(" + targetContent[key] + ") center no-repeat");
                }
                targetEl.children().find("." + key).html(targetContent[key]);
            }
        }
    };

    // slick functions
    var slickInit = function(el, count, rescount){
        el.slick({
            dots: true,
            dotsClass: "slick-dots",
            infinite: true,
            slidesToShow: count,
            slidesToScroll: count,
            responsive: [
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: rescount,
                        slidesToScroll: rescount
                    }
                },
                {
                   breakpoint: 540,
                   settings: {
                       slidesToShow: rescount - 1,
                       slidesToScroll: rescount - 1
                   }
                }
            ]
        });
    };

    $.getJSON("src/novels_preview.json", function(data){
        console.log(data);
        jsonToDOM(data, "farewell", $("#farewell-preview"), "novel-thumbnail");
        jsonToDOM(data, "mirage", $("#mirage-preview"), "novel-thumbnail");
        slickInit($(".novel-carousel"), 3, 2);
        slickInit($(".download-carousel"), 4, 2);
    });

});

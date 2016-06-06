$(document).ready(function () {
    // Toggle menu: may or may not use
    var showMenu = false;
    var toggleMenu = function(){
        if(!showMenu) {
          $(".nav-ul").show();
          $("body").offset({left: -200});
        } else {
          $("body").offset({left: 0});
          $(".nav-ul").hide();
        }
        showMenu = !showMenu;
    };
    $(".menu-button").click(toggleMenu);

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
    var slickInit = function(el){
        el.slick({
            dots: true,
            dotsClass: "slick-dots",
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    };

    $.getJSON("src/novels_preview.json", function(data){
        console.log(data);
        jsonToDOM(data, "farewell", $("#farewell-preview"), "novel-thumbnail");
        slickInit($(".farewell-carousel"));
    });

});

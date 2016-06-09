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
                       slidesToScroll: rescount - 1,
                       autoplay: true
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

        $(".novel-wrapper").click(function(){
            var toAppend = $(".novel-preview-mask-final");
            toAppend.empty();
            $(this).find(".novel-preview-wrapper").clone().appendTo(toAppend);
            toAppend.fadeIn();


            $(".close-preview").click(function(){
                $(".novel-preview-mask-final").fadeOut();
            });

        });

    });


    $(".close-preview").click(function(){
        $(".novel-preview-mask-final").fadeOut();
    });

    // ajax for contact form.
    var form = $('#ajax-contact');
    var formMessages = $('#form-messages');
    $(form).submit(function(event) {
        event.preventDefault();
        var formData = $(form).serialize();
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        }).fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('出错了！邮件没有发送。');
            }
        });


    });


});

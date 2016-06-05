$(document).ready(function () {
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

});
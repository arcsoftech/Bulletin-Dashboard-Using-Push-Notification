if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then(function () {
      console.log('Service Worker Registered for Always push service');
    });
}! function (t) {
  "use strict";
  var i = function () {};
  i.prototype.initNavbar = function () {
    t(".navbar-toggle").on("click", function (i) {
      t(this).toggleClass("open"), t("#navigation").slideToggle(400)
    }), t(".navigation-menu>li").slice(-1).addClass("last-elements"), t('.navigation-menu li.has-submenu a[href="#"]').on("click", function (i) {
      t(window).width() < 992 && (i.preventDefault(), t(this).parent("li").toggleClass("open").find(".submenu:first").toggleClass("open"))
    })
  }, i.prototype.initLoader = function () {
    t(window).load(function () {
      t("#status").fadeOut(), t("#preloader").delay(350).fadeOut("slow"), t("body").delay(350).css({
        overflow: "visible"
      })
    })
  }, i.prototype.initScrollbar = function () {
    t(".slimscroll-noti").slimScroll({
      height: "230px",
      position: "right",
      size: "5px",
      color: "#98a6ad",
      wheelStep: 10
    })
  }, i.prototype.initMenuItem = function () {
    t(".navigation-menu a").each(function () {
      this.href == window.location.href && (t(this).parent().addClass("active"), t(this).parent().parent().parent().addClass("active"), t(this).parent().parent().parent().parent().parent().addClass("active"))
    })
  }, i.prototype.initComponents = function () {
    t('[data-toggle="tooltip"]').tooltip(), t('[data-toggle="popover"]').popover()
  }, i.prototype.initToggleSearch = function () {
    t(".toggle-search").on("click", function () {
      var i, n = t(this).data("target");
      n && (i = t(n), i.toggleClass("open"))
    })
  }, i.prototype.init = function () {
    this.initNavbar(), this.initLoader(), this.initScrollbar(), this.initMenuItem(), this.initComponents(), this.initToggleSearch()
  }, t.MainApp = new i, t.MainApp.Constructor = i
}(window.jQuery),
function (t) {
  "use strict";
  t.MainApp.init()
}(window.jQuery);
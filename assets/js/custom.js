(function ($, window, document) {
  'use strict';
  var pluginName = 'sdc',
    defaults = {
      speedAnimation: 600
    },
    $win = $(window),
    $html = $('html');

  // The plugin constructor
  function Plugin(element, options) {
    var that = this;
    that.element = $(element);
    that.options = $.extend({}, defaults, options);
    that.init();
    $win.load(function(){
      that.activate();
    });
  }

  Plugin.prototype = {
    init: function () {
      this.body = $(document.body);
      this.history = $('.history');
    },
    activate: function (){
      if (this.history.length === 1){
        this.historical();
      }
    },
    historical: function(){
      var instance = this,
        histContent = $('.histcontent'),
        hcItems = histContent.children(),
        histLine = $('.histline ul'),
        hItems = histLine.children(),
        hItemsWidth = hItems.width(),
        hItemsLength = hItems.length,
        hItemsActive = histLine.find('.active'),
        hYears = $('.hist-years'),
        actIndx,
        hItemFirst = hItems.filter(':first'),
        hItemLast = hItems.filter(':last'),
        fYear = hItemFirst.text(),
        lYear = hItemLast.text();

      hYears.html("(" + fYear + " - " + lYear + ")");

      if (actIndx < 0) {
        actIndx = 0;
      }

      hItems.removeClass().addClass('farfar');

      histLine.parent().css({
        'width': hItemsLength * hItemsWidth,
        'marginLeft': (-hItemsWidth * hItemsLength) + (hItemLast.width()/2)
      });

      hItems.eq(5).removeClass().addClass('active');
      hItems.eq(4).removeClass().addClass('far');

      histLine.css({
        'width': hItemsLength*hItemsWidth
      });

      actIndx = histLine.find('.active').index();

      hcItems.eq(actIndx).show();

      hItems.on('click', function(){
        var $this = $(this),
            indx = $this.index();

        hItemsActive = histLine.find('.active');

        histLine.animate({'left': parseInt((-indx)*hItemsWidth) - parseInt(histLine.parent().css('marginLeft')) + -hItemsWidth / 2}, instance.options.speedAnimation);

        if (!$this.hasClass('active')){
          hcItems.fadeOut(instance.options.speedAnimation/2);
          hcItems.eq(indx).delay(instance.options.speedAnimation/1.8).fadeIn(instance.options.speedAnimation/2);
        }

        hItems.removeClass().addClass('farfar');
        $this.prev().removeClass().addClass('far');
        $this.next().removeClass().addClass('far');
        $this.removeClass().addClass('active');
      });
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName,
          new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);

(function ($) {
  $(document.body).sdc();
})(jQuery);

/*
 * Image Scroller Plugin
 * http://www.viget.com/
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net/)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.1
 */
;(function($) {
//Create a draggable interface to scroll over a larger image
$.fn.imageScroller = function(options) {
  var opts = $.extend({}, $.fn.imageScroller.defaults, options);

  return this.each(function() {
    var $this = $(this),
        o = $.meta ? $.extend({}, opts, $this.data()) : opts,
        visibleHeight = $this.height(),
        $preview = $this.find(o.preview),
        previewOffset = $preview.offset(),
        previewHeight = $preview.height(),
        $featureImg = $this.find('img'+o.featureImg),
        featureImgHeight = $featureImg.height(),
        ratio = visibleHeight / featureImgHeight,
        indicatorHeight = Math.round(previewHeight * ratio);
    
    if(featureImgHeight > visibleHeight) {
    
      var $indicator = $('<span/>', {
        'class': 'indicator',
        css: {
          opacity: 0.4,
          height: indicatorHeight
        }
      });
      
      $('<span/>', {
        text: o.indicatorText
      }).appendTo($indicator);
      
      $indicator.appendTo($preview);
      
      $indicator.bind({
        mousedown: function(e) {
          var indicatorOffset = $indicator.offset();
          $(document).bind({
            'mousemove.dragging': function(f) {
              var newPos = f.pageY - previewOffset.top - (e.pageY - indicatorOffset.top);
              if(newPos <= 0) {
                newPos = 0;
              } else if (newPos >= (previewHeight - indicatorHeight)) {
                newPos = previewHeight - indicatorHeight;
              }
              $indicator.css('top',newPos);
              $featureImg.stop().animate({
                top: '-' + Math.round((newPos / previewHeight) * featureImgHeight)
              },10);
            },
            mouseup: function() {
              $(document).unbind('mousemove.dragging');
            }
          });
        }
      });
    
    }
  });
};

// default options
$.fn.imageScroller.defaults = {
  preview: '.preview',
  featureImg: '.feature-image',
  indicatorText: 'Drag Me'
};

})(jQuery);
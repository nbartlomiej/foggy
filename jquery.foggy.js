(function( $ ){

  $.fn.foggy = function( options ) {

    var settings = $.extend( {
      'opacity' : 0.8
    }, options);

    return this.each(function(index, element) {

      var original_content = $(element).html();

      $(element).html('');

      var wrapper = $('<div/>', {
      }).css({
        position: 'relative'
      });

      var renderPass = function(content, position, offset, opacity, target){
        $('<div/>', { html: content }).css({
          position: position,
          opacity: opacity,
          top: offset[0],
          left: offset[1]
        }).appendTo(target);
      }

      var offsets = [
        [-1,-1], [-1,1], [1,-1], [1,1]
      ];

      var opacity = (settings.opacity * 2) / (offsets.length + 1);

      renderPass(original_content, 'relative', [0,0], opacity, wrapper);
      $(offsets).each(function(index, offset){
        renderPass(original_content, 'absolute', offset, opacity, wrapper);
      });

      wrapper.appendTo(element);

    });
  };

})( jQuery );

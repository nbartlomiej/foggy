(function( $ ){

  $.fn.foggy = function( options ) {

    var settings = $.extend( {
      'opacity' : 0.8
    }, options);

    var BlurPass = function(content, position, offset, opacity){
      this.content = content;
      this.position = position;
      this.offset = offset;
      this.opacity = opacity;
    };

    BlurPass.prototype.render = function(target){
      $('<div/>', { html: this.content }).css({
        position: this.position,
        opacity: this.opacity,
        top: this.offset[0],
        left: this.offset[1]
      }).appendTo(target);
    };

    return this.each(function(index, element) {

      var content = $(element).html();

      $(element).html('');

      var wrapper = $('<div/>', {
      }).css({
        position: 'relative'
      });

      var offsets = [
        [-1,-1], [-1,1], [1,-1], [1,1]
      ];

      var opacity = (settings.opacity * 2) / (offsets.length + 1);

      new BlurPass(content, 'relative', [0,0], opacity).render(wrapper);

      $(offsets).each(function(index, offset){
        new BlurPass(content, 'absolute', offset, opacity).render(wrapper);
      });

      wrapper.appendTo(element);

    });
  };

})( jQuery );

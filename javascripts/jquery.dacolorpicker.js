/*!
 * Da colorpicker v1.0.1
 *
 * @name     dacolorpicker
 * @param    imageShow      show or not the image next to input
 * @param    paletteType      name of the palette to be use
 * @example  $("#trigger1").dacolorpicker({imageShow: true,paletteType: "palettePattern1"});
 * @author   David Noguera Gutierrez
 * @date	 2012-12-15
 * @license	 Released under the MIT license
 */
(function($) {
 jQuery.fn.dacolorpicker = function(options) {
	//Default options
	var configuration = {
	  imageShow: true,
	  paletteType: "palettePattern1"
	}
	jQuery.extend(configuration, options);

	this.each(function(){
		var e_trigger, idPalette, idInfo, colorsPalette, daPicker,daPickerImg;

		e_trigger = $(this);		
		idPalette = "#" + $(this).attr("name")+"_paleta";
		idInfo = $(this).attr("name")+"_paleta_info";
		colorsPalette = choosePalette();
		daPicker = $('<div id="'+idPalette+'" class="dacolor-picker">'+colorsPalette+'<div class="cpicker-info" id="'+idInfo+'">Color: </div></div>');
		daPicker.appendTo("body");
		if (configuration.imageShow){
			daPickerImg = $('<img src="images/cpicker.png" class="cpicker">');
			daPickerImg.insertAfter(e_trigger);
			daPickerImg.click(function() {
				showPalette($(this));
			});
		}

		/*e_trigger click event*/
		e_trigger.click(function(){
			showPalette($(this));
		});

		/*e_trigger mouseleave event */
		daPicker.mouseleave(function(){
			daPicker.fadeOut(200);			
		});

		/*Color click event*/
		daPicker.delegate("span", "click", function() {
			var color = $(this).attr("title");
			e_trigger.attr('value',color);
			daPicker.fadeOut(200);
		});

		/*Color mouseover event*/
		daPicker.delegate("span", "mouseover", function() {
			var color = $(this).attr("title"),
				infoLabel = "#" + idInfo;
			$(infoLabel).html('Color: '+color);
		});

		function showPalette(e){
			var posx, posy;
			$(".dacolor-picker").hide();
			posx = configuration.imageShow ? (daPickerImg.offset().left + daPickerImg.outerWidth( true )) : (e_trigger.offset().left + e_trigger.outerWidth( true ));
			posy = e.offset().top;		
			daPicker.css({"position" : "absolute","top": posy,"left": posx});
			daPicker.fadeIn(500);
		}

		/*Color Palettes*/
		function choosePalette(){
			return createPalette(configuration.paletteType=="palettePattern2" ? palettePattern2() : palettePattern1());
		}	  
	});
	return this;

   	/*General functions*/
	function createPalette(fn){
		var output = "", i, j, k, new_color,
			colors = fn;
		for (i=0;i<colors.r.length;i++){
			for (j=0;j<colors.g.length;j++) {
			   for (k=0;k<colors.b.length;k++) {
				  new_color = "#" + colors.r[i] + colors.g[j] + colors.b[k];
				  output+='<span class="color-pick" style="background:' + new_color + '" title="'+new_color+'"></span>';
			   }
			}
		}
		return output; 	  	
	}

	function palettePattern1(){
		var colors =new Array(3);
		colors['r'] = new Array("00","33","66","99","CC","FF");
		colors['g'] = new Array("00","33","66","99","CC","FF");
		colors['b'] = new Array("00","33","66","99","CC","FF");
		return colors; 
	}

	function palettePattern2(){
		var colors =new Array(3);	
		colors['r'] = new Array("C1","B4","A7","9A","8E","00");
		colors['g'] = new Array("C1","00","22","44","66","88");
		colors['b'] = new Array("C1","11","33","55","77","99");
		return colors;   
	}   
};
})(jQuery);
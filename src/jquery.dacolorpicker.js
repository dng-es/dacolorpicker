/*!
 * Da colorpicker
 *
 * @name     dacolorpicker
 * @param    triggerDest      html element where color is sent
 * @author   David Noguera Gutierrez
 * @example  $("#trigger1").dacolorpicker({triggerDest: "destino1",paletteType: "palettePattern1"});
 */
(function($) {
 jQuery.fn.dacolorpicker = function(options) {
   //Default options
   var configuration = {
	  triggerDest: "triggerDest",
	  paletteType: "palettePattern1"
   }
   jQuery.extend(configuration, options);

   this.each(function(){
	  var e_trigger, idPalette, idInfo, colorsPalette, daPicker;
	  
	  e_trigger = $(this);		
	  idPalette = "#" + $(this).attr("name")+"_paleta";
	  idInfo = $(this).attr("name")+"_paleta_info";
	  colorsPalette = choosePalette();
	  daPicker = $('<div id="'+idPalette+'" class="dacolor-picker">'+colorsPalette+'<div class="cpicker-info" id="'+idInfo+'">Color: </div></div>');	   
	  e_trigger.attr("value",0);
	  daPicker.appendTo("body");
	  
	  /*e_trigger click event*/
	  e_trigger.click(function(e){
		e.preventDefault();
		var state = $(this).attr("value");
		if (state==0){
			e_trigger.attr("value",1);
			var posicion, posx, posy;
			posicion = $(this).offset();
			posx = posicion.left + e_trigger.width()+4;
			posy = posicion.top;		
			daPicker.css({"position" : "absolute","top": posy,"left": posx});
			daPicker.fadeIn(500);			
		}
		else{
			e_trigger.attr("value",0);
			daPicker.fadeOut(200);
		}
	  });
	  
	  /*e_trigger mouseleave event */
	  daPicker.mouseleave(function(){
		e_trigger.attr("value",0);
		daPicker.fadeOut(200);			
	  });
	  
	  /*Color click event*/
	  daPicker.delegate("span", "click", function() {
		var color = $(this).attr("title"),
			destino = "#"+configuration.triggerDest;
		$(destino).attr('value',color);
		daPicker.fadeOut(200);
	  });
	  
	  /*Color mouseover event*/
	  daPicker.delegate("span", "mouseover", function() {
		var color = $(this).attr("title"),
			infoLabel = "#" + idInfo;
		$(infoLabel).html('Color: '+color);
	  });
	  
	  /*Color Palettes*/
	  function choosePalette(){
	  	  return configuration.paletteType=="palettePattern2" ? palettePattern2() : palettePattern1();
	  }

	  function palettePattern1(){
		var r = new Array("00","33","66","99","CC","FF"),
			g = new Array("00","33","66","99","CC","FF"),
			b = new Array("00","33","66","99","CC","FF"),			
			palette="", i, j, k, new_color;

		for (i=0;i<r.length;i++){
			for (j=0;j<g.length;j++) {
			   for (k=0;k<b.length;k++) {
				  new_color = "#" + r[i] + g[j] + b[k];
				  palette+='<span class="color-pick" style="background:' + new_color + '" title="'+new_color+'"></span>';
			   }
			}
		}
		return palette;  
	  }
	  
	  function palettePattern2(){
		var r = new Array("C1","B4","A7","9A","8E","00"),
			g = new Array("C1","00","22","44","66","88"),
			b = new Array("C1","11","33","55","77","99"),
			palette="", i, j, k, new_color;

		for (i=0;i<r.length;i++){
			for (j=0;j<g.length;j++) {
			   for (k=0;k<b.length;k++) {
				  new_color = "#" + r[i] + g[j] + b[k];
				  palette+='<span class="color-pick" style="background:' + new_color + '" title="'+new_color+'"></span>';
			   }
			}
		}
		return palette;  
	  }
	  
   });
   return this;
};
})(jQuery);
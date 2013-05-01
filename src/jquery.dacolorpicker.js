/*!
 * Da colorpicker
 *
 * @name     dacolorpicker
 * @param    idDestino      html element where color is sent
 * @author   David Noguera Gutierrez
 * @example  $("#trigger1").dacolorpicker({idDestino: "destino1",tipoPaleta: "PaletaColores"});
 */
(function($) {
 jQuery.fn.dacolorpicker = function(options) {
   //Default options
   var configuration = {
	  idDestino: "triggerDest",
	  tipoPaleta: "PaletaColores"
   }
   jQuery.extend(configuration, options);

   this.each(function(){
	  var lanzador = $(this);		
	  lanzador.attr("value",0);
	  var idPaleta ="#"+ $(this).attr("name")+"_paleta";
	  var idInfo =$(this).attr("name")+"_paleta_info";
	  var colores = SeleccionarPaleta();
	  var daPicker = $('<div id="'+idPaleta+'" class="dacolor-picker">'+colores+'<div class="cpicker-info" id="'+idInfo+'">Color: </div></div>');	  
	  daPicker.appendTo("body");
	  
	  /*Evento click del lanzador*/
	  lanzador.click(function(e){
		e.preventDefault();
		var state = $(this).attr("value");
		if (state==0){
			lanzador.attr("value",1);
			var posicion = $(this).position();
			var posx = posicion.left + lanzador.width()+4;
			var posy = posicion.top;		
			daPicker.css({"position" : "absolute","top": posy,"left": posx});
			daPicker.fadeIn(500);			
		}
		else{
			lanzador.attr("value",0);
			daPicker.fadeOut(200);
		}
	  });
	  
	  /*Evento mouseleave del lanzador*/
	  daPicker.mouseleave(function(){
		lanzador.attr("value",0);
		daPicker.fadeOut(200);			
	  });
	  
	  /*Evento click del color*/
	  daPicker.delegate("span", "click", function() {
		var color = $(this).attr("title");
		var destino = "#"+configuration.idDestino;
		$(destino).attr('value',color);
		daPicker.fadeOut(200);
	  });
	  
	  /*Evento mouseover del color*/
	  daPicker.delegate("span", "mouseover", function() {
		var color = $(this).attr("title");
		var infoLabel = "#" + idInfo;
		$(infoLabel).html('Color: '+color);
	  });
	  
	  /*Paletas de colores*/
	  function SeleccionarPaleta(){
		  if(configuration.tipoPaleta=="PaletaColores2"){return PaletaColores2();}
		  else { return PaletaColores();}
	  }
	  function PaletaColores(){
		var r = new Array("00","33","66","99","CC","FF");
		var g = new Array("00","33","66","99","CC","FF");
		var b = new Array("00","33","66","99","CC","FF");
			
		var colores="";
		for (i=0;i<r.length;i++){
			for (j=0;j<g.length;j++) {
			   for (k=0;k<b.length;k++) {
				  var nuevoc = "#" + r[i] + g[j] + b[k];
				  colores+='<span class="color-pick" style="background:' + nuevoc + '" title="'+nuevoc+'"></span>';
			   }
			}
		}
		return colores;  
	  }
	  
	  function PaletaColores2(){
		var r = new Array("c1","b4","a7","9a","8e","00");
		var g = new Array("c1","00","22","44","66","88");
		var b = new Array("c1","11","33","55","77","99");
			
		var colores="";
		for (i=0;i<r.length;i++){
			for (j=0;j<g.length;j++) {
			   for (k=0;k<b.length;k++) {
				  var nuevoc = "#" + r[i] + g[j] + b[k];
				  colores+='<span class="color-pick" style="background:' + nuevoc + '" title="'+nuevoc+'"></span>';
			   }
			}
		}
		return colores;  
	  }	  
	  
   });
   return this;
};
})(jQuery);
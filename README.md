dacolorpicker
=============

jQuery plugin, add a colorpicker to any input text.


Example 1: colorpicker adding image to the input text
```html
<html>
<head>
  <link rel="stylesheet" href="jquery.dacolorpicker.css" type="text/css"/>
  <script src="jquery-1.9.1.js"></script>
  <script src="jquery.dacolorpicker.js"></script>
  <script>
    $(document).ready(function(){
  		$("#dest1").dacolorpicker();
  	});
  </script>
</head>
<body>
  <input type="text" id="dest1" name="dest1" />
</body>
</html>
```

Example 2: colorpicker without adding image to the input text
```html
      ...
      $("#dest1").dacolorpicker({imageShow: false});
      ...

```

Example 3: colorpicker with image added and palette "palettePattern2". Current available palettes: "palettePattern1" (default), "palettePattern2"
```html
      ...
      $("#dest1").dacolorpicker({imageShow: true, paletteType: "palettePattern2"});
      ...

```

<a href="http://dng-es.github.io/dacolorpicker" target="_blank">More info</a>
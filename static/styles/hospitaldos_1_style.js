var size = 0;
var placement = "point";

var style_hospitaldos_1 = function (feature, resolution) {
  var context = {
    feature: feature,
    variables: {},
  };
  var value = "";
  var labelText = "";
  size = 0;
  var labelFont = "13.0px 'Cooper Black', sans-serif";
  var labelFill = "#323232";
  var bufferColor = "#ffffff";
  var bufferWidth = 1.0;
  var textAlign = "left";
  var offsetX = 8;
  var offsetY = 3;
  var placement = "point";
  if (feature.get("nombre") !== null) {
    labelText = String(feature.get("nombre"));
  }
  var style = [
    new ol.style.Style({
      image: new ol.style.Icon({
        imgSize: [1299, 846],
        scale: 0.05234795996920708,
        anchor: [34, 34],
        anchorXUnits: "pixels",
        anchorYUnits: "pixels",
        rotation: 0.0,
        src: "/static/styles/image_new.svg",
      }),
      text: createTextStyle(
        feature,
        resolution,
        labelText,
        labelFont,
        labelFill,
        placement,
        bufferColor,
        bufferWidth
      ),
    }),
  ];

  return style;
};

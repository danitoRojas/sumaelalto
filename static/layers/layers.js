var wms_layers = [];

var lyr_Positron_0 = new ol.layer.Tile({
  title: "Positron",
  type: "base",
  opacity: 1.0,

  source: new ol.source.XYZ({
    attributions:
      ' &middot; <a href="https://cartodb.com/basemaps/">Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>',
    url: "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  }),
});
var format_hospitaldos_1 = new ol.format.GeoJSON();
var features_hospitaldos_1 = format_hospitaldos_1.readFeatures(
  json_hospitaldos_1,
  { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_hospitaldos_1 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_hospitaldos_1.addFeatures(features_hospitaldos_1);
var lyr_hospitaldos_1 = new ol.layer.Vector({
  declutter: true,
  source: jsonSource_hospitaldos_1,
  style: style_hospitaldos_1,
  interactive: true,
  title: '<img src="styles/legend/hospitaldos_1.png" /> hospitaldos',
});

lyr_Positron_0.setVisible(true);
lyr_hospitaldos_1.setVisible(true);
var layersList = [lyr_Positron_0, lyr_hospitaldos_1];
lyr_hospitaldos_1.set("fieldAliases", {
  gid: "gid",
  latitud: "latitud",
  longitud: "longitud",
  nombre: "nombre",
  direccion: "direccion",
  celular: "celular",
  nivel: "nivel",
  hora_inicio: "hora_inicio",
  hora_fin: "hora_fin",
  nombre_director: "nombre_director",
});
lyr_hospitaldos_1.set("fieldImages", {
  gid: "TextEdit",
  latitud: "TextEdit",
  longitud: "TextEdit",
  nombre: "TextEdit",
  direccion: "TextEdit",
  celular: "TextEdit",
  nivel: "TextEdit",
  hora_inicio: "TextEdit",
  hora_fin: "TextEdit",
  nombre_director: "TextEdit",
});
lyr_hospitaldos_1.set("fieldLabels", {
  gid: "inline label",
  latitud: "inline label",
  longitud: "inline label",
  nombre: "inline label",
  direccion: "inline label",
  celular: "inline label",
  nivel: "inline label",
  hora_inicio: "inline label",
  hora_fin: "inline label",
  nombre_director: "inline label",
});
lyr_hospitaldos_1.on("precompose", function (evt) {
  evt.context.globalCompositeOperation = "normal";
});

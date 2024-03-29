/**
 * Skipped minification because the original files appears to be already minified.
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*!
 * ol-geocoder - v4.0.0
 * A geocoder extension for OpenLayers.
 * https://github.com/jonataswalker/ol-geocoder
 * Built: Wed Oct 09 2019 11:36:42 GMT-0300 (Brasilia Standard Time)
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e(
        require("ol/control/Control"),
        require("ol/style/Style"),
        require("ol/style/Icon"),
        require("ol/layer/Vector"),
        require("ol/source/Vector"),
        require("ol/geom/Point"),
        require("ol/Feature"),
        require("ol/proj")
      ))
    : "function" == typeof define && define.amd
    ? define(
        [
          "ol/control/Control",
          "ol/style/Style",
          "ol/style/Icon",
          "ol/layer/Vector",
          "ol/source/Vector",
          "ol/geom/Point",
          "ol/Feature",
          "ol/proj",
        ],
        e
      )
    : ((t = t || self).Geocoder = e(
        t.ol.control.Control,
        t.ol.style.Style,
        t.ol.style.Icon,
        t.ol.layer.Vector,
        t.ol.source.Vector,
        t.ol.geom.Point,
        t.ol.Feature,
        t.ol.proj
      ));
})(this, function (t, a, i, n, s, r, o, d) {
  "use strict";
  (t = t && t.hasOwnProperty("default") ? t.default : t),
    (a = a && a.hasOwnProperty("default") ? a.default : a),
    (i = i && i.hasOwnProperty("default") ? i.default : i),
    (n = n && n.hasOwnProperty("default") ? n.default : n),
    (s = s && s.hasOwnProperty("default") ? s.default : s),
    (r = r && r.hasOwnProperty("default") ? r.default : r),
    (o = o && o.hasOwnProperty("default") ? o.default : o),
    (d = d && d.hasOwnProperty("default") ? d.default : d);
  var e = "gcd-container",
    l = "gcd-button-control",
    c = "gcd-input-query",
    u = "gcd-input-reset",
    p = {
      namespace: "ol-geocoder",
      spin: "gcd-pseudo-rotate",
      hidden: "gcd-hidden",
      address: "gcd-address",
      country: "gcd-country",
      city: "gcd-city",
      road: "gcd-road",
      olControl: "ol-control",
      glass: {
        container: "gcd-gl-container",
        control: "gcd-gl-control",
        button: "gcd-gl-btn",
        input: "gcd-gl-input",
        expanded: "gcd-gl-expanded",
        reset: "gcd-gl-reset",
        result: "gcd-gl-result",
      },
      inputText: {
        container: "gcd-txt-container",
        control: "gcd-txt-control",
        input: "gcd-txt-input",
        reset: "gcd-txt-reset",
        icon: "gcd-txt-glass",
        result: "gcd-txt-result",
      },
    },
    h = {
      containerId: e,
      buttonControlId: l,
      inputQueryId: c,
      inputResetId: u,
      cssClasses: p,
    },
    m = Object.freeze({
      __proto__: null,
      containerId: e,
      buttonControlId: l,
      inputQueryId: c,
      inputResetId: u,
      cssClasses: p,
      default: h,
    }),
    g = "addresschosen",
    f = "nominatim",
    y = "reverse",
    v = "glass-button",
    w = "text-input",
    b = "osm",
    k = "mapquest",
    C = "photon",
    x = "bing",
    L = "opencage",
    q = {
      provider: b,
      placeholder: "Search for an address",
      featureStyle: null,
      targetType: v,
      lang: "en-US",
      limit: 5,
      keepOpen: !1,
      preventDefault: !1,
      autoComplete: !1,
      autoCompleteMinLength: 2,
      debug: !1,
    };
  function E(t, e) {
    if ((void 0 === e && (e = "Assertion failed"), !t)) {
      if ("undefined" != typeof Error) throw new Error(e);
      throw e;
    }
  }
  function j(t) {
    var e = (function () {
      if (
        ("performance" in window == !1 && (window.performance = {}),
        (Date.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        "now" in window.performance == !1)
      ) {
        var t = Date.now();
        performance.timing &&
          performance.timing.navigationStart &&
          (t = performance.timing.navigationStart),
          (window.performance.now = function () {
            return Date.now() - t;
          });
      }
      return window.performance.now();
    })().toString(36);
    return t ? t + e : e;
  }
  function T(t) {
    return /^\d+$/.test(t);
  }
  function P(t, e, n) {
    if (Array.isArray(t))
      t.forEach(function (t) {
        return P(t, e);
      });
    else
      for (var s = Array.isArray(e) ? e : e.split(/\s+/), r = s.length; r--; )
        N(t, s[r]) || O(t, s[r], n);
  }
  function S(t, e, n) {
    if (Array.isArray(t))
      t.forEach(function (t) {
        return S(t, e, n);
      });
    else
      for (var s = Array.isArray(e) ? e : e.split(/\s+/), r = s.length; r--; )
        N(t, s[r]) && D(t, s[r], n);
  }
  function N(t, e) {
    return t.classList ? t.classList.contains(e) : _(e).test(t.className);
  }
  function R(t, e, n) {
    void 0 === e && (e = window.document);
    var s = Array.prototype.slice,
      r = [];
    if (/^(#?[\w-]+|\.[\w-.]+)$/.test(t))
      switch (t[0]) {
        case "#":
          r = [
            (function (t) {
              return (
                (t = "#" === t[0] ? t.substr(1, t.length) : t),
                document.getElementById(t)
              );
            })(t.substr(1)),
          ];
          break;
        case ".":
          r = s.call(e.getElementsByClassName(t.substr(1).replace(/\./g, " ")));
          break;
        default:
          r = s.call(e.getElementsByTagName(t));
      }
    else r = s.call(e.querySelectorAll(t));
    return n ? r : r[0];
  }
  function I(t, n) {
    return t.replace(/\{ *([\w_-]+) *\}/g, function (t, e) {
      return (function (t) {
        return String(t)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      })(void 0 === n[e] ? "" : n[e]);
    });
  }
  function A(t, e) {
    var n;
    if (Array.isArray(t)) {
      if (
        ((n = document.createElement(t[0])),
        t[1].id && (n.id = t[1].id),
        t[1].classname && (n.className = t[1].classname),
        t[1].attr)
      ) {
        var s = t[1].attr;
        if (Array.isArray(s))
          for (var r = -1; ++r < s.length; )
            n.setAttribute(s[r].name, s[r].value);
        else n.setAttribute(s.name, s.value);
      }
    } else n = document.createElement(t);
    n.innerHTML = e;
    for (var o = document.createDocumentFragment(); n.childNodes[0]; )
      o.appendChild(n.childNodes[0]);
    return n.appendChild(o), n;
  }
  function _(t) {
    return new RegExp("(^|\\s+) " + t + " (\\s+|$)");
  }
  function O(t, e, n) {
    t.classList
      ? t.classList.add(e)
      : (t.className = (t.className + " " + e).trim()),
      n &&
        T(n) &&
        window.setTimeout(function () {
          return D(t, e);
        }, n);
  }
  function D(t, e, n) {
    t.classList
      ? t.classList.remove(e)
      : (t.className = t.className.replace(_(e), " ").trim()),
      n &&
        T(n) &&
        window.setTimeout(function () {
          return O(t, e);
        }, n);
  }
  function M(t) {
    (this.options = t.options), (this.els = this.createControl());
  }
  var B = m.cssClasses;
  (M.prototype.createControl = function () {
    var t, e, n;
    return (
      ((n =
        this.options.targetType === w
          ? ((e = B.namespace + " " + B.inputText.container),
            {
              container: (t = A(
                ["div", { id: m.containerId, classname: e }],
                M.input
              )),
              control: R("." + B.inputText.control, t),
              input: R("." + B.inputText.input, t),
              reset: R("." + B.inputText.reset, t),
              result: R("." + B.inputText.result, t),
            })
          : ((e = B.namespace + " " + B.glass.container),
            {
              container: (t = A(
                ["div", { id: m.containerId, classname: e }],
                M.glass
              )),
              control: R("." + B.glass.control, t),
              button: R("." + B.glass.button, t),
              input: R("." + B.glass.input, t),
              reset: R("." + B.glass.reset, t),
              result: R("." + B.glass.result, t),
            })).input.placeholder = this.options.placeholder),
      n
    );
  }),
    (M.glass = [
      '<div class="',
      B.glass.control,
      " ",
      B.olControl,
      '">',
      '<button type="button"',
      ' id="',
      m.buttonControlId,
      '"',
      ' class="',
      B.glass.button,
      '"></button>',
      '<input type="text"',
      ' id="',
      m.inputQueryId,
      '"',
      ' class="',
      B.glass.input,
      '"',
      ' autocomplete="off" placeholder="Search ...">',
      "<a",
      ' id="',
      m.inputResetId,
      '"',
      ' class="',
      B.glass.reset,
      " ",
      B.hidden,
      '"',
      "></a>",
      "</div>",
      '<ul class="',
      B.glass.result,
      '"></ul>',
    ].join("")),
    (M.input = [
      '<div class="',
      B.inputText.control,
      '">',
      '<input type="text"',
      ' id="',
      m.inputQueryId,
      '"',
      ' class="',
      B.inputText.input,
      '"',
      ' autocomplete="off" placeholder="Search ...">',
      '<span class="',
      B.inputText.icon,
      '"></span>',
      '<button type="button"',
      ' id="',
      m.inputResetId,
      '"',
      ' class="',
      B.inputText.reset,
      " ",
      B.hidden,
      '"',
      "></button>",
      "</div>",
      '<ul class="',
      B.inputText.result,
      '"></ul>',
    ].join(""));
  function F() {
    this.settings = {
      url: "https://photon.komoot.de/api/",
      params: { q: "", limit: 10, lang: "en" },
      langs: ["de", "it", "fr", "en"],
    };
  }
  (F.prototype.getParameters = function (t) {
    return (
      (t.lang = t.lang.toLowerCase()),
      {
        url: this.settings.url,
        params: {
          q: t.query,
          limit: t.limit || this.settings.params.limit,
          lang:
            -1 < this.settings.langs.indexOf(t.lang)
              ? t.lang
              : this.settings.params.lang,
        },
      }
    );
  }),
    (F.prototype.handleResponse = function (t) {
      if (t.features.length)
        return t.features.map(function (t) {
          return {
            lon: t.geometry.coordinates[0],
            lat: t.geometry.coordinates[1],
            address: {
              name: t.properties.name,
              postcode: t.properties.postcode,
              city: t.properties.city,
              state: t.properties.state,
              country: t.properties.country,
            },
            original: { formatted: t.properties.name, details: t.properties },
          };
        });
    });
  function V() {
    this.settings = {
      url: "https://nominatim.openstreetmap.org/search/",
      params: {
        q: "",
        format: "json",
        addressdetails: 1,
        limit: 10,
        countrycodes: "",
        "accept-language": "en-US",
      },
    };
  }
  (V.prototype.getParameters = function (t) {
    return {
      url: this.settings.url,
      params: {
        q: t.query,
        format: this.settings.params.format,
        addressdetails: this.settings.params.addressdetails,
        limit: t.limit || this.settings.params.limit,
        countrycodes: t.countrycodes || this.settings.params.countrycodes,
        "accept-language": t.lang || this.settings.params["accept-language"],
      },
    };
  }),
    (V.prototype.handleResponse = function (t) {
      if (t.length)
        return t.map(function (t) {
          return {
            lon: t.lon,
            lat: t.lat,
            address: {
              name: t.display_name,
              road: t.address.road || "",
              houseNumber: t.address.house_number || "",
              postcode: t.address.postcode,
              city: t.address.city || t.address.town,
              state: t.address.state,
              country: t.address.country,
            },
            original: { formatted: t.display_name, details: t.address },
          };
        });
    });
  function Q() {
    this.settings = {
      url: "http://open.mapquestapi.com/nominatim/v1/search.php",
      params: {
        q: "",
        key: "",
        format: "json",
        addressdetails: 1,
        limit: 10,
        countrycodes: "",
        "accept-language": "en-US",
      },
    };
  }
  (Q.prototype.getParameters = function (t) {
    return {
      url: this.settings.url,
      params: {
        q: t.query,
        key: t.key,
        format: "json",
        addressdetails: 1,
        limit: t.limit || this.settings.params.limit,
        countrycodes: t.countrycodes || this.settings.params.countrycodes,
        "accept-language": t.lang || this.settings.params["accept-language"],
      },
    };
  }),
    (Q.prototype.handleResponse = function (t) {
      if (t.length)
        return t.map(function (t) {
          return {
            lon: t.lon,
            lat: t.lat,
            address: {
              name: t.address.neighbourhood || "",
              road: t.address.road || "",
              postcode: t.address.postcode,
              city: t.address.city || t.address.town,
              state: t.address.state,
              country: t.address.country,
            },
            original: { formatted: t.display_name, details: t.address },
          };
        });
    });
  function U() {
    this.settings = {
      url: "https://dev.virtualearth.net/REST/v1/Locations",
      callbackName: "jsonp",
      params: { query: "", key: "", includeNeighborhood: 0, maxResults: 10 },
    };
  }
  (U.prototype.getParameters = function (t) {
    return {
      url: this.settings.url,
      callbackName: this.settings.callbackName,
      params: {
        query: t.query,
        key: t.key,
        includeNeighborhood:
          t.includeNeighborhood || this.settings.params.includeNeighborhood,
        maxResults: t.maxResults || this.settings.params.maxResults,
      },
    };
  }),
    (U.prototype.handleResponse = function (t) {
      var e = t.resourceSets[0].resources;
      if (e.length)
        return e.map(function (t) {
          return {
            lon: t.point.coordinates[1],
            lat: t.point.coordinates[0],
            address: { name: t.name },
            original: {
              formatted: t.address.formattedAddress,
              details: t.address,
            },
          };
        });
    });
  function G() {
    this.settings = {
      url: "https://api.opencagedata.com/geocode/v1/json?",
      params: {
        q: "",
        key: "",
        limit: 10,
        countrycode: "",
        pretty: 1,
        no_annotations: 1,
      },
    };
  }
  function $(s) {
    return new Promise(function (t, e) {
      var n = (function (t, e) {
        e &&
          "object" == typeof e &&
          (t +=
            (/\?/.test(t) ? "&" : "?") +
            (function n(s) {
              return Object.keys(s)
                .reduce(function (t, e) {
                  return (
                    t.push(
                      "object" == typeof s[e]
                        ? n(s[e])
                        : encodeURIComponent(e) + "=" + encodeURIComponent(s[e])
                    ),
                    t
                  );
                }, [])
                .join("&");
            })(e));
        return t;
      })(s.url, s.data);
      s.jsonp
        ? (function (t, e, n) {
            var s = document.head,
              r = document.createElement("script"),
              o = "f" + Math.round(Math.random() * Date.now());
            r.setAttribute(
              "src",
              t + (0 < t.indexOf("?") ? "&" : "?") + e + "=" + o
            ),
              (window[o] = function (t) {
                (window[o] = void 0),
                  setTimeout(function () {
                    return s.removeChild(r);
                  }, 0),
                  n(t);
              }),
              s.appendChild(r);
          })(n, s.callbackName, t)
        : fetch(n, { method: "GET", mode: "cors", credentials: "same-origin" })
            .then(function (t) {
              return t.json();
            })
            .then(t)
            .catch(e);
    });
  }
  (G.prototype.getParameters = function (t) {
    return {
      url: this.settings.url,
      params: {
        q: t.query,
        key: t.key,
        limit: t.limit || this.settings.params.limit,
        countrycode: t.countrycodes || this.settings.params.countrycodes,
      },
    };
  }),
    (G.prototype.handleResponse = function (t) {
      if (t.results.length)
        return t.results.map(function (t) {
          return {
            lon: t.geometry.lng,
            lat: t.geometry.lat,
            address: {
              name: t.components.house_number || "",
              road: t.components.road || "",
              postcode: t.components.postcode,
              city: t.components.city || t.components.town,
              state: t.components.state,
              country: t.components.country,
            },
            original: { formatted: t.formatted, details: t.components },
          };
        });
    });
  function z(t, e) {
    (this.Base = t),
      (this.layerName = j("geocoder-layer-")),
      (this.layer = new n({ name: this.layerName, source: new s() })),
      (this.options = t.options),
      (this.options.provider =
        "string" == typeof this.options.provider
          ? this.options.provider.toLowerCase()
          : this.options.provider),
      (this.provider = this.newProvider()),
      (this.els = e),
      (this.lastQuery = ""),
      (this.container = this.els.container),
      (this.registeredListeners = { mapClick: !1 }),
      this.setListeners();
  }
  var H = m.cssClasses;
  return (
    (z.prototype.setListeners = function () {
      var n,
        s,
        r = this;
      this.els.input.addEventListener(
        "keypress",
        function (t) {
          var e = t.target.value.trim();
          (t.key
            ? "Enter" !== t.key
            : t.which
            ? 13 !== t.which
            : !t.keyCode || 13 !== t.keyCode) ||
            (t.preventDefault(), r.query(e));
        },
        !1
      ),
        this.els.input.addEventListener(
          "click",
          function (t) {
            t.stopPropagation();
          },
          !1
        ),
        this.els.input.addEventListener(
          "input",
          function (t) {
            var e = t.target.value.trim();
            e.length ? S(r.els.reset, H.hidden) : P(r.els.reset, H.hidden),
              r.options.autoComplete &&
                e !== s &&
                ((s = e),
                n && clearTimeout(n),
                (n = setTimeout(function () {
                  e.length >= r.options.autoCompleteMinLength && r.query(e);
                }, 200)));
          },
          !1
        ),
        this.els.reset.addEventListener(
          "click",
          function (t) {
            r.els.input.focus(),
              (r.els.input.value = ""),
              (r.lastQuery = ""),
              P(r.els.reset, H.hidden),
              r.clearResults();
          },
          !1
        ),
        this.options.targetType === v &&
          this.els.button.addEventListener(
            "click",
            function (t) {
              t.stopPropagation(),
                N(r.els.control, H.glass.expanded) ? r.collapse() : r.expand();
            },
            !1
          );
    }),
    (z.prototype.query = function (t) {
      var n = this;
      this.provider || (this.provider = this.newProvider());
      var e = this.provider.getParameters({
        query: t,
        key: this.options.key,
        lang: this.options.lang,
        countrycodes: this.options.countrycodes,
        limit: this.options.limit,
      });
      if (this.lastQuery !== t || !this.els.result.firstChild) {
        (this.lastQuery = t), this.clearResults(), P(this.els.reset, H.spin);
        var s = { url: e.url, data: e.params };
        e.callbackName && ((s.jsonp = !0), (s.callbackName = e.callbackName)),
          $(s)
            .then(function (t) {
              n.options.debug && console.info(t), S(n.els.reset, H.spin);
              var e = n.provider.handleResponse(t);
              e && (n.createList(e), n.listenMapClick());
            })
            .catch(function (t) {
              S(n.els.reset, H.spin);
              var e = A("li", "<h5>Error! No internet connection?</h5>");
              n.els.result.appendChild(e);
            });
      }
    }),
    (z.prototype.createList = function (t) {
      var s = this,
        r = this.els.result;
      t.forEach(function (e) {
        var n;
        switch (s.options.provider) {
          case b:
            n = '<span class="' + H.road + '">' + e.address.name + "</span>";
            break;
          default:
            n = s.addressTemplate(e.address);
        }
        var t = A("li", '<a href="#">' + n + "</a>");
        t.addEventListener(
          "click",
          function (t) {
            t.preventDefault(), s.chosen(e, n, e.address, e.original);
          },
          !1
        ),
          r.appendChild(t);
      });
    }),
    (z.prototype.chosen = function (t, e, n, s) {
      var r = this.Base.getMap(),
        o = [parseFloat(t.lon), parseFloat(t.lat)],
        a = r.getView().getProjection(),
        i = d.transform(o, "EPSG:4326", a),
        l = t.bbox;
      l = l && d.transformExtent(l, "EPSG:4326", a);
      var c = { formatted: e, details: n, original: s };
      if (
        (!1 === this.options.keepOpen && this.clearResults(!0),
        !0 === this.options.preventDefault)
      )
        this.Base.dispatchEvent({
          type: g,
          address: c,
          coordinate: i,
          bbox: l,
        });
      else {
        l
          ? r.getView().fit(l, { duration: 500 })
          : (function (t, e, n, s) {
              (s = s || 2.388657133911758),
                (n = n || 500),
                t
                  .getView()
                  .animate(
                    { duration: n, resolution: s },
                    { duration: n, center: e }
                  );
            })(r, i);
        var u = this.createFeature(i, c);
        this.Base.dispatchEvent({
          type: g,
          address: c,
          feature: u,
          coordinate: i,
          bbox: l,
        });
      }
    }),
    (z.prototype.createFeature = function (t) {
      var e = new o(new r(t));
      return (
        this.addLayer(),
        e.setStyle(this.options.featureStyle),
        e.setId(j("geocoder-ft-")),
        this.getSource().addFeature(e),
        e
      );
    }),
    (z.prototype.addressTemplate = function (t) {
      var e = [];
      return (
        t.name && e.push(['<span class="', H.road, '">{name}</span>'].join("")),
        (t.road || t.building || t.house_number) &&
          e.push(
            [
              '<span class="',
              H.road,
              '">{building} {road} {house_number}</span>',
            ].join("")
          ),
        (t.city || t.town || t.village) &&
          e.push(
            [
              '<span class="',
              H.city,
              '">{postcode} {city} {town} {village}</span>',
            ].join("")
          ),
        (t.state || t.country) &&
          e.push(
            ['<span class="', H.country, '">{state} {country}</span>'].join("")
          ),
        I(e.join("<br>"), t)
      );
    }),
    (z.prototype.newProvider = function () {
      switch (this.options.provider) {
        case b:
          return new V();
        case k:
          return new Q();
        case C:
          return new F();
        case x:
          return new U();
        case L:
          return new G();
        default:
          return this.options.provider;
      }
    }),
    (z.prototype.expand = function () {
      var t = this;
      S(this.els.input, H.spin),
        P(this.els.control, H.glass.expanded),
        window.setTimeout(function () {
          return t.els.input.focus();
        }, 100),
        this.listenMapClick();
    }),
    (z.prototype.collapse = function () {
      (this.els.input.value = ""),
        this.els.input.blur(),
        P(this.els.reset, H.hidden),
        S(this.els.control, H.glass.expanded),
        this.clearResults();
    }),
    (z.prototype.listenMapClick = function () {
      if (!this.registeredListeners.mapClick) {
        var e = this,
          n = this.Base.getMap().getTargetElement();
        (this.registeredListeners.mapClick = !0),
          n.addEventListener(
            "click",
            {
              handleEvent: function (t) {
                e.clearResults(!0),
                  n.removeEventListener(t.type, this, !1),
                  (e.registeredListeners.mapClick = !1);
              },
            },
            !1
          );
      }
    }),
    (z.prototype.clearResults = function (t) {
      t && this.options.targetType === v
        ? this.collapse()
        : (function (t) {
            for (; t.firstChild; ) t.removeChild(t.firstChild);
          })(this.els.result);
    }),
    (z.prototype.getSource = function () {
      return this.layer.getSource();
    }),
    (z.prototype.addLayer = function () {
      var e = this,
        n = !1,
        t = this.Base.getMap();
      t.getLayers().forEach(function (t) {
        t === e.layer && (n = !0);
      }),
        n || t.addLayer(this.layer);
    }),
    (function (r) {
      function o(t, e) {
        if (
          (void 0 === t && (t = f),
          void 0 === e && (e = {}),
          !(this instanceof o))
        )
          return new o();
        var n;
        E("string" == typeof t, "@param `type` should be string!"),
          E(
            t === f || t === y,
            "@param 'type' should be '" + f + "'\n        or '" + y + "'!"
          ),
          E("object" == typeof e, "@param `options` should be object!"),
          (q.featureStyle = [
            new a({
              image: new i({
                scale: 0.7,
                src: "//cdn.rawgit.com/jonataswalker/map-utils/master/images/marker.png",
              }),
            }),
          ]),
          (this.options = (function (t, e) {
            var n = {};
            for (var s in t) n[s] = t[s];
            for (var r in e) n[r] = e[r];
            return n;
          })(q, e)),
          (this.container = void 0);
        var s = new M(this);
        t === f &&
          ((this.container = s.els.container),
          (n = new z(this, s.els)),
          (this.layer = n.layer)),
          r.call(this, { element: this.container });
      }
      return (
        r && (o.__proto__ = r),
        (((o.prototype = Object.create(r && r.prototype)).constructor =
          o).prototype.getLayer = function () {
          return this.layer;
        }),
        (o.prototype.getSource = function () {
          return this.getLayer().getSource();
        }),
        (o.prototype.setProvider = function (t) {
          this.options.provider = t;
        }),
        (o.prototype.setProviderKey = function (t) {
          this.options.key = t;
        }),
        o
      );
    })(t)
  );
});

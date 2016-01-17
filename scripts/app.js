L.mapbox.accessToken = 'pk.eyJ1Ijoid2lsbGlhbWJlbmRhdmlzIiwiYSI6IlVrb3BGVzQifQ.jeHxDCnpXXvAXKfAFEYG-A';
// In the propeties object for each marker define key's
// like `rentals`, `fuel`, `tackleshop` that are set to true for false
// depending on whether or they exist at a location.

var map = L.mapbox.map('map', 'mapbox.dark')
    .setView([42.68, -95.63], 5)

teams = L.geoJson(teams, {
    pointToLayer: function(feature, ll) {
      return L.marker(ll, {
        icon: L.divIcon({
          className: 'leaflet-label',
          html: feature.properties.Name,
          iconSize: [50, 50],
          iconAnchor: [20,10]
        })
      });
    }
  })

var routes = L.geoJson(games, {style: style, onEachFeature: onEachFeature}).addTo(map);
var teams = L.geoJson(teams, {style: style, onEachFeature: onEachFeature}).addTo(map);

// var routes = L.mapbox.featureLayer()
//     .setGeoJSON(geojsonLayer)
//     .addTo(map);

function style(feature) {
  return {
    color: "#fd8202",
    weight: getWeight(feature.properties.games),
    opacity: 0.1
    }
  }

function getWeight(p) {
  return    p >= 3 ? 3 :
            p >= 2 ? 2 :
            p >= 1 ? 1 :
            1;
  };

function getIcon(p) {
  return    p === "Avalanche" ? "img/avalanche-01.png" :
            p === "Blackhawks" ? "img/blackhawks-01.png" :
            p === "Jackets" ? "img/jackets-01.png" :
            p === "Blues" ? "img/blues-01.png" :
            p === "Bruins" ? "img/bruins-01.png" :
            p === "Canadiens" ? "img/canadiens-01.png" :
            p === "Canucks" ? "img/canucks-01.png" :
            p === "Capitals" ? "img/capitals-01.png" :
            p === "Coyotes" ? "img/coyotes-01.png" :
            p === "Devils" ? "img/devils-01.png" :
            p === "Ducks" ? "img/ducks-01.png" :
            p === "Flames" ? "img/flames-01.png" :
            p === "Flyers" ? "img/flyers-01.png" :
            p === "Hurricanes" ? "img/hurricanes-01.png" :
            p === "Islanders" ? "img/islanders-01.png" :
            p === "Kings" ? "img/kings-01.png" :
            p === "Lightning" ? "img/lightning-01.png" :
            p === "Leafs" ? "img/leafs-01.png" :
            p === "Oilers" ? "img/oilers-01.png" :
            p === "Panthers" ? "img/panthers-01.png" :
            p === "Penguins" ? "img/penguins-01.png" :
            p === "Predators" ? "img/predators-01.png" :
            p === "Rangers" ? "img/rangers-01.png" :
            p === "Wings" ? "img/wings-01.png" :
            p === "Sabres" ? "img/sabres-01.png" :
            p === "Senators" ? "img/senators-01.png" :
            p === "Sharks" ? "img/sharks-01.png" :
            p === "Stars" ? "img/stars-01.png" :
            p === "Wild" ? "img/wild-01.png" :
            p === "Winnipeg" ? "img/jets-01.png" :
            "NA";
  };

function onEachFeature(feature, layer) {
      layer.on({
          mousemove: displaypopup,
          mouseout: mouseout,
          click: mobile
        });
};

var closeTooltip

  function displaypopup(e) {
    var layer = e.target;
    var popup = L.popup({autoPan: false});

      popup.setLatLng(e.latlng);
      popup.setContent('<div class="versusimages">' + '<img src="' + getIcon(layer.feature.properties.origin) + '">' + 'VS.' + '<img src="' + getIcon(layer.feature.properties.dest) + '">' + '</div>' + '<div class="gamesplayed">' + 'Number of games played this season: ' + '<span>' + layer.feature.properties.games + '</span>' + '</div>');

      if (!popup._map) popup.openOn(map);
      window.clearTimeout(closeTooltip);

      // highlight feature
      layer.setStyle({
          weight: 3,
          color: '#feac56',
          opacity: 1,
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  };

  function mobile(e) {
    var layer = e.target;
    var popup = L.popup({autoPan: true});

      popup.setLatLng(e.latlng);
      popup.setContent('Cool');
      if (!popup._map) popup.openOn(map);
      window.clearTimeout(closeTooltip);

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  };

  function mouseout(e) {
      routes.resetStyle(e.target);
      closeTooltip = window.setTimeout(function() {
          map.closePopup();
      }, 100);
  };


$('.menu-ui a').on('click', function() {
    // For each filter link, get the 'data-filter' attribute value.
    var filter = $(this).data('filter');
    $(this).addClass('active').siblings().removeClass('active');
    routes.setFilter(function(f) {
        // If the data-filter attribute is set to "all", return
        // all (true). Otherwise, filter on markers that have
        // a value set to true based on the filter name.
        return (filter === 'all') ? true : f.properties[filter] === true;
    });
    return false;
});
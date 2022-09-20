<script>
            var mymap;
            var lyrOSM;
            var lyrWatercolor;
            var lyrTopo;
            var lyrImagery;
            var lyrOutdoors;
            var lyrEagleNests;
            var lyrPagleNests;
            var lyrBagleNests;
            var lyrRaptorNests;
            var lyrClientLines;
            var lyrSectorLines;
            var lyrClientLinesBuffer;
            var lyrBUOWL;
            var lyrSectors;
            var lyrBUOWLbuffer;
            var jsnBUOWLbuffer;
            var lyrGBH;
            var lyrSearch;
            var lyrMarkerCluster;
            var mrkCurrentLocation;
            var fgpDrawnItems;
            var ctlAttribute;
            var ctlScale;
            var ctlMouseposition;
            var ctlMeasure;
            var ctlEasybutton;
            var ctlSidebar;
            var ctlLayers;
            var ctlStyle;
            var ctlLegend;
            var objBasemaps;
            var objOverlays;
            var arProjectIDs = [];
            var arHabitatIDs = [];
            var arEagleIDs = [];
            var arRaptorIDs = [];

            $(document).ready(function(){

 //  ********* Map Initialization ****************
                mymap = L.map('mapdiv',
                    {center:[ 33.4782656, -111.718955],
                     zoom:6,
                     attributionControl:false});

                mymap.options.minZoom = 0;
                mymap.options.maxZoom = 22;

                ctlSidebar = L.control.sidebar('side-bar').addTo(mymap);

                ctlEasybutton = L.easyButton('glyphicon-transfer', function(){
                   ctlSidebar.toggle();
                }).addTo(mymap);

                // ctlAttribute = L.control.attribution().addTo(mymap);
                // ctlAttribute.addAttribution('Google Maps');
                // ctlAttribute.addAttribution('&copy; <a href="#">Harvest Media Australia</a>');

                ctlScale = L.control.scale({position:'bottomleft', metric:false, maxWidth:200}).addTo(mymap);

                ctlMouseposition = L.control.mousePosition().addTo(mymap);

                //   *********** Layer Initialization **********


                // lyrImagery = L.tileLayer.provider('Esri.WorldImagery');
                var googleSat = L.gridLayer.googleMutant({
                maxZoom: 24,
                type: "roadmap",
                styles: [
        {
        "featureType": "administrative","elementType": "labels.text.fill","stylers": [{"color": "#444444" }]},{"featureType": "landscape","elementType": "all", "stylers": [{"color": "#f2f2f2"}]},{"featureType": "poi","elementType": "all","stylers": [{"visibility": "off" }]},{"featureType": "road","elementType": "all","stylers": [{"saturation": -100},{ "lightness": 45}]},{ "featureType": "road.highway","elementType": "all","stylers": [{"visibility": "simplified"}]},{"featureType": "road.highway", "elementType": "labels.text", "stylers": [{"visibility": "off"}]},{"featureType": "road.highway","elementType": "labels.text.fill", "stylers": [{"visibility": "off"}]},{ "featureType": "road.highway", "elementType": "labels.text.stroke","stylers": [{ "visibility": "off"
            },{"saturation": "-9"}]},{ "featureType": "road.highway","elementType": "labels.icon","stylers": [{ "visibility": "off" }] },{"featureType": "road.arterial","elementType": "labels.icon","stylers": [ { "visibility": "off" }]}, {"featureType": "transit","elementType": "all", "stylers": [{"visibility": "off"}]},{ "featureType": "water", "elementType": "all","stylers": [{ "color": "#46bcec" }, {"visibility": "on" }]}]
            });
                mymap.addLayer(googleSat);

                //******* loading our database **********


                // refreshDist();
                //refreshSectorLines();
                 refreshEagles();

                // ********* Setup Layer Control  ***************

                objBasemaps = {
                    'Open Street Maps': lyrOSM,
                    Imagery: lyrImagery,
                };

                 objOverlays = {};

                ctlLayers = L.control.layers(objOverlays).addTo(mymap);

                 mymap.on('zoomend', function(e) {
                    if (mymap.getZoom() <= 10){
                        // mymap.addLayer(lyrEagleNests);
                        // mymap.addLayer(lyrSectors);
                        // mymap.addLayer(lyrClientLines);
                        // lyrEagleNests.bringToFront();
                    }else{

                    }
                    if(mymap.getZoom() >= 10.5){
                        //  mymap.addLayer(lyrClientLines);
                        // mymap.addLayer(lyrSectors);

                    }else{
                       // mymap.addLayer(lyrClientLines);
                    }
                });



        //***************************************************************
        // ************ Client Linears **********
           function processClientLinears(json, lyr) {
                var att = json.properties;
             //lyr.bindPopup("<h4>Boundary: "+att.nsw_lga__3+"</h4>");
             arProjectIDs.push(att.nsw_lga__3.toString());
            }

            // function refreshDist() {

            //         $.ajax({
            //         url: 'https://track.onestepgps.com/v3/api/public/device-info?state_detail=1&lat_lng',
            //             success: function (response) {
            //                 jsnLinears = JSON.parse(response);
            //                 if (lyrClientLines) {
            //                     lyrClientLines.remove();
            //                     lyrClientLinesBuffer.remove();
            //                 }
            //                 lyrClientLines = L.geoJSON(jsnLinears, {
            //                     color: 'black',
            //                     dashArray: '5,3',
            //                     fillOpacity: 0,
            //                     opacity: 0.5,
            //                     onEachFeature: processClientLinears,
            //                 }).addTo(mymap);
            //             },

            //         });
            //     }

            //  ***********  Soil Profiles Functions *********

         function styleClientLinears(json) {
                var att = json.properties;
                switch (att.asc_order) {
                    case 'Anthroposols':
                        return {color:'#F7B7C6'};
                        break;
                    case 'Calcarosols':
                        return {color:'#D79F9F'};
                        break;
                    case 'Chromosols':
                        return {color:'#FDD380'};
                        break;
                    case 'Dermosols':
                        return {color:'#9FA9D7'};
                        break;
                    case 'Ferrosols':
                        return {color:'#CE6667'};
                        break;
                    case 'Hydrosols':
                        return {color:'#5D8CA1'};
                        break;
                    case 'Kandosols':
                        return {color:'#FCBF31'};
                        break;
                    case 'Kurosols':
                        return {color:'#D7C29F'};
                        break;
                    case 'Kurosols - Natric':
                        return {color:'#A59376'};
                        break;
                    case 'Organosols':
                        return {color:'#72A746'};
                        break;
                    case 'Podosols':
                        return {color:'#FFFF73'};
                        break;
                     case 'Rudosols':
                        return {color:'#B5876E'};
                        break;
                    case 'Rudosols - Alluvial':
                        return {color:'#B4D895'};
                        break;
                    case 'Rudosols and Tenosols':
                        return {color:'#CECE66'};
                        break;
                    case 'Sodosols':
                        return {color:'#F5A37B'};
                        break;
                     case 'Tenosols':
                        return {color:'#CEA979'};
                        break;
                    case 'Tenosols Alluvial':
                        return {color:'#B5D69F'};
                        break;
                     case 'Vertosols':
                        return {color:'#828282'};
                        break;
                     case 'Not Assessed':
                        return {color:'#B3B3B3'};
                        break;
                    case 'Water':
                        return {color:'#BEE8FF'};
                        break;
                    default:
                        return
                }
            }

            function processSoilmarker(json,lyr){
                var att = json.properties;
                lyr.bindTooltip("<h4>Soil: "+att.asc_order+"</h4>").addTo(mymap).openPopup();
            }
            function refreshSectorLines(){
                mymap.spin(true);
                $.ajax({url:'json.php',
                    data: {tbl:'', flds:'ASC_order, ASC_code'},
                    type: 'GET',
                    success: function(response){
                         arEagleIDs=[];
                        jsnSector = JSON.parse(response);
                        if(lyrSectors){
                            ctlLayers.addLayer(lyrSectors);
                            lyrSectors.remove();
                        }
                        lyrSectors = L.geoJSON(jsnSector,
                        {
                        fillOpacity: 0.4,
                        weight: 0.5,
                    onEachFeature:processSoilmarker,
                    pointToLayer:returnEagleMarker,
                    style:styleClientLinears,
                    filter:filterEagle});

                    arEagleIDs.sort(function(a,b){return a-b});
                    $("#txtFindEagle").autocomplete({
                        source:arEagleIDs
                    });
                        lyrMarkerCluster = L.markerClusterGroup();
                        lyrMarkerCluster.clearLayers();
                        lyrMarkerCluster.addLayer(lyrSectors);
                        ctlLayers.addOverlay(lyrSectors, "Soil Profiles");
                        mymap.spin(false);

                    },
                    error: function(xhr, status, error){
                        alert("ERROR: "+error);
                    }
                });
            }



            // *********  Eagle Functions *****************
            function returnEagleMarker(json, latlng){
                var att = json.properties;
                if (att.active_state=='on') {
                    var clrNest = 'deeppink';
                } else {
                    var clrNest = 'black';
                }
                // arEagleIDs.push(att.type.toString());
                return L.circle(latlng, {radius:2, color:clrNest,fillColor:'chartreuse', fillOpacity:0.5});
            }

              function processPcodemarker(json,lyr){
                var container = $('<div />');
                container.on('click', '.smallPolygonLink', function(){
                    this.classList.toggle('is-open');
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight){
                            // accordion is open, we need to close it
                            
                             content.style.maxHeight = null;
                        }else{
                            //accordion is closed
                            content.style.maxHeight = content.scrollHeight + "px";
                           
                        }
                    });

            var att = json.properties;
                if (att.type=='Live Stream') {
                    container.html("<img width='100' class='rounded' src='data/hamish.jpg' alt='avatar'> <h2 class='top-right'>"+att.title+"</h2> <br> <button class='smallPolygonLink'>Media</button> <div class='smallPolygonLink-content'>"+att.mp3+"</div><h5>Date </h5>"+att.date+"<br><h5>Location</h5>"+att.location+"<br> <h5>Observation</h5>"+att.observation);
                 } else {
                    container.html("<img width='100' class='rounded' src='data/hamish.jpg' alt='avatar'> <h2 class='top-right'>"+att.make+"</h2> <br> <button class='smallPolygonLink'>Media</button> <div class='smallPolygonLink-content'>"+att.mp3+"</div> <button class='live'>Live Stream</button><h5>Date </h5>"+att.active_state+"<br><h5>Location</h5>"+att.model+"<br> <h5>Observation</h5>"+att.observation);
                     }
                lyr.bindPopup(container[0]).openPopup().bringToFront().addTo(mymap);
            }
            function processBaglemarker(json,lyr){
                var att = json.properties;
                lyr.bindTooltip("<h4>Post Code: "+att.field_1+"</h4>").openPopup();
            }

            function filterEagle(json) {
                var att=json.properties;
                var optFilter = $("input[name=fltEagle]:checked").val();
                if (optFilter=='ALL') {
                    return true;
                } else {
                    return (att.status==optFilter);
                }
            }
             function refreshEagles(){
                $.ajax({url:'json.php',
                    //data: {tbl:'hamish', flds:'observation, mp3_url, date'},
                    type: 'GET',
                    success: function(response){
                        arEagleIDs=[];
                        jsnEagles = JSON.parse(response);
                        if(lyrEagleNests){
                            ctlLayers.removeLayer(lyrEagleNests);
                            ctlLayers.removeLayer(lyrMarkerCluster);
                            lyrEagleNests.remove();
                        }
                        lyrEagleNests = L.geoJSON(jsnEagles,
                        { 
                          onEachFeature:processPcodemarker, 
                          pointToLayer:returnEagleMarker, 
                          filter:filterEagle
                        });

                    arEagleIDs.sort(function(a,b){return a-b});
                    $("#txtFindEagle").autocomplete({
                        source:arEagleIDs
                    });
                    lyrMarkerCluster = L.markerClusterGroup();
                        lyrMarkerCluster.clearLayers();
                        lyrMarkerCluster.addLayer(lyrEagleNests);

                        lyrMarkerCluster.addTo(mymap);
                        //ctlLayers.addOverlay(lyrMarkerCluster, "Markers");
                    },
                    error: function(xhr, status, error){
                        alert("ERROR: "+error);
                    }
                });
            }



            //  ***********  General Functions *********
                $("btnLocate").click(function(){
                    mymap.locate();
                });

            //  ***********  General Functions *********

            function LatLngToArrayString(ll) {
                return "["+ll.lat.toFixed(5)+", "+ll.lng.toFixed(5)+"]";
            }
            function returnLayerByAttribute(lyr,att,val) {
                var arLayers = lyr.getLayers();
                for (i=0;i<arLayers.length-1;i++) {
                    var ftrVal = arLayers[i].feature.properties[att];
                    if (ftrVal==val) {
                        return arLayers[i];
                    }
                }
                return false;
            }

            function returnLayersByAttribute(lyr,att,val) {
                var arLayers = lyr.getLayers();
                var arMatches = [];
                for (i=0;i<arLayers.length-1;i++) {
                    var ftrVal = arLayers[i].feature.properties[att];
                    if (ftrVal==val) {
                        arMatches.push(arLayers[i]);
                    }
                }
                if (arMatches.length) {
                    return arMatches;
                } else {
                    return false;
                }
            }

            function testLayerAttribute(ar, val, att, fg, err, btn) {
                if (ar.indexOf(val)<0) {
                    $(fg).addClass("has-error");
                    $(err).html("**** "+att+" NOT FOUND ****");
                    $(btn).attr("disabled", true);
                } else {
                    $(fg).removeClass("has-error");
                    $(err).html("");
                    $(btn).attr("disabled", false);
                }
            }

            function returnLength(arLL) {
                var total=0;
                for (var i=1;i<arLL.length;i++) {
                    total = total + arLL[i-1].distanceTo(arLL[i]);
                }
                return total;
            }

            function returnMultiLength(arArLL) {
                var total=0;
                for (var i=0; i<arArLL.length;i++) {
                    total = total + returnLength(arArLL[i]);
                }
                return total;
            }

            function stripSpaces(str) {
                return str.replace(/\s+/g, '');
            }
        });

        
         </script>
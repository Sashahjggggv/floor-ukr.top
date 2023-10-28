jQuery(function($) {
    var marker = [],
        infowindow = [],
        map,
        markerIndex = 0,
        openIndex = 0,
        clusteringImage,
        markerCluster,
        mcOptions;

    function addMarker(location,image,additionalImage,text,index){
        marker[index] = new google.maps.Marker({
            position: location,
            map: map,
            icon: {
                url: image,
                scaledSize: new google.maps.Size(50, 65)
            },
            mainImage: image,
            additionalImage: additionalImage
        });
        marker[index].setMap(map);


        infowindow[index] = new google.maps.InfoWindow({
            content: text
        });

        google.maps.event.addListener(marker[index], 'click', function() {
            $('#tags').val('');
            infowindow[openIndex].close();
            openIndex = index;
            infowindow[index].open(map,marker[index]);
            // $('.gm-style-iw').parent().addClass('style-infobox');
            
            
            map.setCenter(marker[index].getPosition());
            var newIcon = {url:marker[index].additionalImage, scaledSize: new google.maps.Size(50, 65)};
             marker[index].setIcon(newIcon);
            // marker[index].icon.size.width(50);
            // marker[index].icon.size.height(50);

            for (var i = 0; i < marker.length; i++) {
                if (index !== i) {
                    var newIcon = {url:marker[i].mainImage, scaledSize: new google.maps.Size(50, 65)};
                    marker[i].setIcon(newIcon);
                }
            }
            
        });

        google.maps.event.addListener(infowindow[index],'closeclick',function(){
            $('#tags').val('');
            for (var i = 0; i < marker.length; i++) {
                var newIcon = {url:marker[i].mainImage, scaledSize: new google.maps.Size(50, 65)};
                marker[i].setIcon(newIcon);
            }
        });
    }

    function map_recenter(map,latlng,offsetx,offsety) {
        var point1 = map.getProjection().fromLatLngToPoint(
            (latlng instanceof google.maps.LatLng) ? latlng : map.getCenter()
        );
        var point2 = new google.maps.Point(
            ( (typeof(offsetx) == 'number' ? offsetx : 0) / Math.pow(2, map.getZoom()) ) || 0,
            ( (typeof(offsety) == 'number' ? offsety : 0) / Math.pow(2, map.getZoom()) ) || 0
        );
        map.setCenter(map.getProjection().fromPointToLatLng(new google.maps.Point(
            point1.x - point2.x,
            point1.y + point2.y
        )));
    }

    function initialize() {

        var mapId = $('#map-canvas'),
            lat = mapId.data("lat"),
            lng = mapId.data("lng"),
            mapCenter = new google.maps.LatLng(lat,lng),

            mapZoom = parseInt(mapId.data("zoom")),
            styles = [{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"60"},{"gamma":"1.00"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"saturation":"0"},{"lightness":"0"},{"gamma":"1"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"lightness":"0"},{"weight":"1.48"}]},{"featureType":"landscape.man_made","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ed8d2c"},{"lightness":"20"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"hue":"#ff0000"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#60aaea"},{"saturation":"36"},{"lightness":"-32"}]},{"featureType":"road.local","elementType":"all","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"lightness":30}]}];
            styledMap = new google.maps.StyledMapType(styles,{name: "Р РЋРЎвЂљР С‘Р В»РЎвЂ“Р В·Р С•Р Р†Р В°Р Р…Р В° Р С”Р В°РЎР‚РЎвЂљР В°"}),
            mapOptions = {
                scrollwheel: false,
                zoom: mapZoom,

                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                streetViewControl: false,

                center: mapCenter,
                mapTypeControl: false,
                fullscreenControl: false
            };

        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        $('.marker-entry').each(function(){
            var lat = $(this).data('lat'),
	            lng = $(this).data('lng'),
	            latlng = new google.maps.LatLng(lat, lng),
	            image = $(this).data('image'),
	            additionalImage = $(this).data('additional-image'),
	            text = '<div class="marker-entry">'+$(this).html()+'</div>';
	        $(this).data('popupInfo', markerIndex );
	       
	        addMarker(latlng,image,additionalImage,text,markerIndex);
	        $(this).data('index', markerIndex);
	        markerIndex++;
	        });

	        // Add a marker clusterer to manage the markers.
	        clusteringImage = mapId.data('cluster-image');
	        mcOptions = {
	            styles: [{
	                textColor: 'white',
	                url: clusteringImage,
	                height: 56,
	                width: 45
	            }]
        	};
        markerCluster = new MarkerClusterer(map, marker, mcOptions);

    }

    $('.map-panel-category').on('click', function(){
        for ( var i = 0; i < marker.length; i++ ) {
            infowindow[i].close();
        }
        
        unselectMarkers();

        var $this = $(this),
            $thisActive = $this.hasClass('active'),
            $thisIndex = $this.index(),
            allPanel = $('.map-panel-entry.child'),
            allMarkers = allPanel.find('.marker-entry'),
            activeCategoryLength = $('.map-panel-category.active').length,
            thisPanel = $('.map-panel-entry.child').eq($thisIndex);

            if ($thisActive && activeCategoryLength !== 1) {
               $this.removeClass('active');
               thisPanel.removeClass('active');
           } else if ( $thisActive && activeCategoryLength == 1 ) {
               $this.removeClass('active');
               thisPanel.removeClass('active');
           } else {
                $this.addClass('active');
                thisPanel.addClass('active');
            }

        // setTimeout(function() {
            var selectedItems = [];
            $('.map-panel-entry.child.active').each(function() {
                $(this).find('.marker-entry').each(function() {
                    selectedItems.push($(this));
                });
            });
             if ($thisActive && activeCategoryLength !== 1) {

                    selectMarkers(selectedItems);
               } else if ( $thisActive && activeCategoryLength == 1 ) {

                    if (!selectedItems.length ) {
                        $('.map-panel-entry.child').each(function() {
                            $(this).find('.marker-entry').each(function() {
                                selectedItems.push($(this));
                            });
                        });
                       selectMarkers(selectedItems);
                    }
               } else {
                    selectMarkers(selectedItems);
            }
        // },400);
        
    });

    function selectMarkers(markers){
        marker = [];
        markerIndex = 0;
        for (var i=0; i<markers.length; i++) {
        	    var lat = markers[i][0].dataset.lat;
	            lng = markers[i][0].dataset.lng,
	            latlng = new google.maps.LatLng(lat, lng),
	            image = markers[i][0].dataset.image,
	            additionalImage = markers[i][0].dataset.additionalImage,
	            text = '<div class="marker-entry">'+markers[i][0].innerHTML+'</div>';
                // $(this).data('popupInfo', markerIndex );
	       		addMarker(latlng,image,additionalImage,text,markerIndex);
	       		markerIndex++;
        }
        markerCluster = new MarkerClusterer(map, marker, mcOptions);
    }

    function unselectMarkers(){
        for(var i=0; i<marker.length; i++){
            marker[i].setMap(null);
        }
        markerCluster.clearMarkers();
    }

    $('.map-panel-toggle').on('click', function(){
        $(this).parent().toggleClass('active');
    });

    if ($('#map-canvas').length) {
        setTimeout(function() {
            initialize();

            var jsonTitle = [];
            $('.marker-entry').each(function(){
                jsonTitle.push($(this).find('.title').html());
                if($(this).find('.description').html() != undefined){
                    jsonTitle.push($(this).find('.description').html());
                }
            });

            var prevPopup = 0;
            if ($("#tags").length) {
                $( "#tags" ).autocomplete({
                    source: jsonTitle,
                    open: function(event, ui) {
                        $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                    },
                    select: function( event, ui) {
                        if ( event.toElement === undefined ) return false;
                         $('.marker-entry').each(function(){
                            if($(this).find('.title').html() == event.toElement.innerHTML){
                                showSearchPopup($(this));
                            }
                            else if($(this).find('.description').html() == event.toElement.innerHTML){
                                showSearchPopup($(this));
                            }
                         });
                    }

                });
            }
        }, 500);
    }

    $('#tags').keydown(function(e) {
        markerIndex = 0;
        if(e.keyCode == 13) {
            $('.map-panel-entry.child').removeClass('active');
            $('.marker-entry').each(function(){
                if ( $(this) !== undefined ) {
                    $(this).data('index', markerIndex);
                    markerIndex++;
                }
            });
            var inputSearchVal = $('#tags').val();
            $('.marker-entry').each(function(){
                if( $(this).find('.title').html() == inputSearchVal ){
                    showSearchPopup($(this));
                }
                else if ( $(this).find('.description').html() == inputSearchVal ) {
                    showSearchPopup($(this));
                }
             });
            return false;
        }
    });

    $('.map-wrap .map_image_search').on('click', function() {
        markerIndex = 0;
        var inputSearchVal = $('#tags').val();
        $('.map-panel-entry.child').removeClass('active');
    
        $('.marker-entry').each(function(){
            if( $(this).find('.title').html() == inputSearchVal ){
                showSearchPopup($(this));
            }
            else if ( $(this).find('.description').html() == inputSearchVal ) {
                showSearchPopup($(this));
            }
         });
    });

    function showSearchPopup($this) {
        var selectedItems = [];
        unselectMarkers();
        
       

        $('.map-panel-category').removeClass('active');
        $('.map-panel-entry.child').each(function() {
            $(this).find('.marker-entry').each(function() {
                selectedItems.push($(this));
            });
        });
        selectMarkers(selectedItems);
             for ( var i = 0; i < marker.length; i++ ) {
                infowindow[i].close();
                var newIcon = {url:marker[i].mainImage, scaledSize: new google.maps.Size(50, 65)};
                marker[i].setIcon(newIcon);
        }
            if ( $this.data('popupInfo') !== undefined ) {
                var newIcon2 = {url:marker[$this.data('popupInfo')].additionalImage, scaledSize: new google.maps.Size(50, 65)};
                marker[$this.data('popupInfo')].setIcon(newIcon2);
                infowindow[$this.data('popupInfo')].open(map,marker[$this.data('popupInfo')]);
            }
            
            map.setZoom(18);

        setTimeout(function(){
            map.setCenter(new google.maps.LatLng($this[0].dataset.lat,$this[0].dataset.lng));
        },300);
       
        
    }

});



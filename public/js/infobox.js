var marker = new google.maps.Marker({
         map: map,
         draggable: true,
         position: new google.maps.LatLng(49.47216, -123.76307),
         visible: true
        });
                
        var boxText = document.createElement("div");
        boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
        boxText.innerHTML = "City Hall, Sechelt<br>British Columbia<br>Canada";
                
        var myOptions = {
                 content: boxText
                ,disableAutoPan: false
                ,maxWidth: 0
                ,pixelOffset: new google.maps.Size(-140, 0)
                ,zIndex: null
                ,boxStyle: { 
                  background: "url('tipbox.gif') no-repeat"
                  ,opacity: 0.75
                  ,width: "280px"
                 }
                ,closeBoxMargin: "10px 2px 2px 2px"
                ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
        };

        var ib = new infobox(myOptions);
        ib.open(map, marker);

var labelText = "City Hall";

        var myOptions = {
                 content: labelText
                ,boxStyle: {
                   border: "1px solid black"
                  ,textAlign: "center"
                  ,fontSize: "8pt"
                  ,width: "50px"
                 }
                ,disableAutoPan: true
                ,pixelOffset: new google.maps.Size(-25, 0)
                ,position: new google.maps.LatLng(49.47216, -123.76307)
                ,closeBoxURL: ""
                ,isHidden: false
                ,pane: "mapPane"
                ,enableEventPropagation: true
        };

        var ibLabel = new infobox(myOptions);
        ibLabel.open(map);
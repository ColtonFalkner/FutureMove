// How do we build this to search zip from user input?  The 2nd example is working.
        
        // Example1:
        var zip = $(this).attr("snapshot.postalcode")
        var properties = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot/lookup?postalcode=" + zip + "&minUniversalSize=1200&maxUniversalSize=1800",
            "method": "GET",
            "headers": {
                "apikey" : "0da31fe50c76d41e8f480520b54d9a17",
                "accept": "application/json"
            }
        }
        $.ajax(properties).then(function (response) {
            console.log(response);
        })

        // Example2:
        var property = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot?postalcode=" + 37204 + "&minUniversalSize=1200&maxUniversalSize=1800",
            "method": "GET",
            "headers": {
                "apikey" : "0da31fe50c76d41e8f480520b54d9a17",
                "accept": "application/json"
            }
        }
        $.ajax(property).then(function (response) {
            console.log(response);
        })

        // Example3:
        $('#startbtn').on('click', function () {

            var url = 'https://search.onhttps://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot?postalcodeboard-apis.com/propertyapi/v1.0.0/property/address';
            var zipCode = '37024';
            var pageNumber = 1;
            var pageSize = 20;
    
            var data = {
                'postalcode': zipCode,
                'page': pageNumber,
                'pagesize': pageSize
            }
            var headers = {
                'Accept': 'application/json',
                'apikey': '0da31fe50c76d41e8f480520b54d9a17'
            }
    
            function responseHandler(response) {
                var printedText = JSON.stringify(response);
                document.getElementById('ATTOM_PROPERTY_ADDRESS__textarea').value = printedText;
            }
    
            makeAjaxGetCall(url, headers, data, responseHandler);
    
        });


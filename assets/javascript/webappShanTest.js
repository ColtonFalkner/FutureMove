

    var result = result
    var result
    var crime = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.gateway.attomdata.com/communityapi/v2.0.0/Area/Full/?AreaId=CO47037",
        "method": "GET",
        "headers": {
            "apikey" : "0da31fe50c76d41e8f480520b54d9a17",
            "accept": "application/json"
        }
    }
    $.ajax(crime).then(function (response) {
        console.log(response);
    })
       .then(function(response) {
           console.log(response.result.package.item[i].id);
        //    console.log(response);
           $("#eventResults").html("<h3>" + result.package.item[i].crmcytotc + "</h3>");
        });
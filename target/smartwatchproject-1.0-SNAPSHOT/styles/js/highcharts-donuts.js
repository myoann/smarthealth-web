function doDonut(_id,_user,_objectif,_type){
    var restant = parseInt(_objectif) - parseInt(_user);
    var colors = Highcharts.getOptions().colors,
        categories = [''],
        data = [{
            y: 55.11,
            color: colors[0],
            drilldown: {
                name: 'Effectué',
                categories: ['Effectué'],
                data: [parseInt(_user)],
                color: colors[0]
            }
        }, {
            y: 21.63,
            color: colors[1],
            drilldown: {
                name: 'Restant',
                categories: ['Restant'],
                data: [parseInt(restant)],
                color: colors[1]
            }
        }],
        browserData = [],
        versionsData = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y/*,
            color: data[i].color*/
        });

        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    $('#'+_id).highcharts({
        chart: {
         //   backgroundColor:'rgba(255, 255, 255, 0.1)',
            height:190,
            type: 'pie',
            spacingTop:0,
            spacingBottom:0,
            spacingRight:0,
            spacingLeft:0,
            marginTop:-15,
            marginBottom:-10,
            marginLeft:0,
            marginRight:0
        },
        exporting:{
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: _user+' / '+_objectif+' '+_type,
            verticalAlign: 'bottom', 
            y: -10,
            style: {
                fontSize:"12px"
            }
        },
        yAxis: {
            title: {
                text: 'Total percent'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        series: [{
            name: 'Nombre de '+_type,
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                connectorWidth: 0
            }
        }]
    });
}
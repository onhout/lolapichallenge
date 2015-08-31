/**
 * Created by pl on 8/28/15.
 */

var createGraph = function(barData){
    var vis = d3.select('#visualisation'),
        WIDTH = 1000,
        HEIGHT = 500,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function (d) {
            return d.name;
        })),


        yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
            d3.max(barData, function (d) {
                return d.values;
            })
        ]),

        xAxis = d3.svg.axis()
            .scale(xRange)
            .tickSize(3)
            .tickSubdivide(true),

        yAxis = d3.svg.axis()
            .scale(yRange)
            .tickSize(3)
            .orient("left")
            .tickSubdivide(true);


    vis.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
        .style('fill', 'white')
        .call(xAxis);

    vis.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
        .style('fill', 'white')
        .call(yAxis);

    vis.selectAll('rect')
        .data(barData)
        .enter()
        .append('rect')
        .attr('x', function (d) {
            return xRange(d.name);
        })
        .attr('y', function (d) {
            return yRange(d.values);
        })
        .attr('width', xRange.rangeBand())
        .attr('height', function (d) {
            return ((HEIGHT - MARGINS.bottom) - yRange(d.values));
        })
        .attr('fill', 'darkred')
        .on('mouseover', function(d){console.log('Y axis: ', d.values);});
};

var resetGraph = function(){
    $('#visualisation').html('');
};

var getGraphData = function(highlow, criteria){
    var barData = [];
    $.get('./asset/json/highestlowest/highestlowest.json', function(data){
        var sijd = data.chart[criteria];
        var start, end;
        if(highlow == 'high'){
            start = 0;
            end = 10;
        } else if (highlow=='low'){
            start = 10;
            end = 0;
        }
        for (var i = start; i< Object.keys(sijd).length-end; i++){
            barData.push(data.chart[criteria][Object.keys(sijd)[i]]);
        }

    }).done(function(){
        createGraph(barData);
    });
};

$(function(){
    var currentSelection = 'Ban_Percentage';
    $('#graphTitle').text('Ban Percentage');
    var rand = Math.floor(Math.random() * (4 - 1) + 1);
    $('body').css('background-image', 'url(./asset/background/'+rand+'.jpg)');
    $.get('./asset/json/highestlowest/highestlowest.json', function(data){
        for (var i = 0; i< Object.keys(data.chart).length; i++){
            $('#links').append('<li><a href="#" id="'+Object.keys(data.chart)[i]+'" class="graphLinks">'+Object.keys(data.chart)[i].split('_').join(' ')+'</a></li>');
        }
        $('.graphLinks').click(function(e){
            $('#graphTitle').text($(this).text());
            currentSelection = $(this).attr('id');
            resetGraph();
            getGraphData('high', $(this).attr('id'));
            e.preventDefault();
        });
    });
    $('#high').click(function(e){
        resetGraph();
        getGraphData('high', currentSelection);
        e.preventDefault();
    });
    $('#low').click(function(e){
        resetGraph();
        getGraphData('low', currentSelection);
        e.preventDefault();
    });
    getGraphData('high', currentSelection);
});
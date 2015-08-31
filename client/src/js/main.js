/**
 * Created by pl on 8/28/15.
 */
$(function(){
    var rand = Math.floor(Math.random() * (4 - 1) + 1);
    $('body').css('background-image', 'url(./asset/background/'+rand+'.jpg)');

    var barData = [{
        'x': 'John',
        'y': 5
    }, {
        'x': 10,
        'y': 20
    }, {
        'x': 40,
        'y': 10
    }, {
        'x': 60,
        'y': 40
    }, {
        'x': 80,
        'y': 5
    }, {
        'x': 100,
        'y': 100
    }, {
        'x': 120,
        'y': 150
    }, {
        'x': 'Fu',
        'y': 14
    }];

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
            return d.x;
        })),


        yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
            d3.max(barData, function (d) {
                return d.y;
            })
        ]),

        xAxis = d3.svg.axis()
            .scale(xRange)
            .tickSize(5)
            .tickSubdivide(true),

        yAxis = d3.svg.axis()
            .scale(yRange)
            .tickSize(5)
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
            return xRange(d.x);
        })
        .attr('y', function (d) {
            return yRange(d.y);
        })
        .attr('width', xRange.rangeBand())
        .attr('height', function (d) {
            return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
        })
        .attr('fill', 'darkred');
});
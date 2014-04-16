var fullWidth = 800;
var fullHeight = 500;
var margin = {left: 50, right: 50, top:10, bottom: 50};
var width = fullWidth - margin.left - margin.right;
var height = fullHeight - margin.top - margin.bottom;

var svg = d3.select("#chart")
    .append("svg")
    .attr("width", fullWidth)
    .attr("height", fullHeight);

var xAxisGroup = svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+ margin.left +"," + (fullHeight - margin.bottom) +")");

var yAxisGroup = svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chartGroup = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function render(data) {    
    var xScale = d3.scale.linear()
        .domain([0,180])
        .range([0, width]);

    var xAxis = d3.svg.axis().scale(xScale);
    xAxisGroup.call(xAxis);

    var yScale = d3.scale.linear()
        .domain([0, 0.30])
        .range([height, 0]);

    var yAxis = d3.svg.axis().scale(yScale).orient("left");
    yAxisGroup.call(yAxis);

    var sizeScale = d3.scale.linear()
        .domain(d3.extent(data, function(d) { 
            return d.value > 1000 ? d.value : 1000; 
        }))
        .range([10, 60])

    var colorScale = d3.scale.category20();

    var circles = chartGroup.selectAll("circle")
        .data(data);

    circles
        .enter()
        .append("circle")
        .attr("fill", function(d) { return colorScale(d.channel); });

    circles.transition().duration(500)
        .attr("cx", function(d) { return xScale(d.velocity); })
        .attr("cy", function(d) { return yScale(d.rate); })
        .attr("r", function(d) { return sizeScale(d.value); });
        
}

var data1 = [{channel: "Search", velocity: 89, rate: 0.23, value: 149553.72},
            {channel: "Email", velocity: 42, rate: 0.05, value: 15763.76},
            {channel: "Events", velocity: 86, rate: 0.10, value: 19612.50},
            {channel: "Social", velocity: 86, rate: 0.04, value: 26498.50},
            {channel: "ContentSyndication", velocity: 143, rate: 0.02, value: 19607.56},
            {channel: "Nuture", velocity: 31, rate: 0.08, value: 11300},
            {channel: "Sponsorship", velocity: 72, rate: 0.06, value: 0},
            {channel: "Display", velocity: 33, rate: 0.06, value: 8397.5},
            {channel: "Retargeting", velocity: 52, rate: 0.21, value: 0},
            {channel: "Newsletter", velocity: 74, rate: 0.21, value: 0}];

var data2 = [{channel: "Search", velocity: 42, rate: 0.04, value: 49553.72},
             {channel: "Email", velocity: 30, rate: 0.05, value: 15763.76},
             {channel: "Events", velocity: 89, rate: 0.06, value: 119612.50},
             {channel: "Social", velocity: 70, rate: 0.23, value: 26498.50},
             {channel: "ContentSyndication", velocity: 31, rate: 0.02, value: 0},
             {channel: "Nuture", velocity: 143, rate: 0.08, value: 11300},
             {channel: "Sponsorship", velocity: 45, rate: 0.10, value: 19607.56},
             {channel: "Display", velocity: 23, rate: 0.06, value: 8397.5},
             {channel: "Retargeting", velocity: 52, rate: 0.21, value: 0},
             {channel: "Newsletter", velocity: 74, rate: 0.21, value: 0}];

render(data1);

d3.select("#data1").on("click", function() { render(data1); });
d3.select("#data2").on("click", function() { render(data2); });


var csvData;

d3.csv('assets/data/data.csv').then(data => {
    csvData = data;

    var width = parseInt(d3.select('#scatter').style('width'));
    var height = width - width / 3.9;
    var margin = 20;
    var labelArea = 110;
    var tPadBot = 40;
    var tPadLeft = 40;
    var svg = d3.select('#scatter').append('svg');
    var curX = 'poverty';
    var curY = 'obesity';
    var xMin;
    var xMax;
    var yMin;
    var yMax;

    svg
        .style('background','white')
        .style('width',width)
        .style('height',height)
        .attr('class','chart');

    svg.append('g').attr('class', 'xText');

    var xText = d3.select('xText');
    
    xText = d3
        .select('.xText')
        .text('In Poverty (%)')
        .attr('y',26)
        .attr('data-name','poverty')
        .attr('data-axis','x')
        .attr('class','aText active x')
        .attr('transform', `translate(${((width - labelArea) / 2 + labelArea)}, ${(height - margin - tPadBot)})`);

    svg.append('g').attr('class','yText');

    var yText = d3.select('class','yText');
    var leftTextX = margin + tPadLeft;
    var leftTextY = (height + labelArea) / 2 - labelArea;

    yText
        .append('text')
        .text('Obese (%)')
        .attr('y',0)
        .attr('data-name','obesity')
        .attr('data-axis','y')
        .attr('class','aText active y')
        .attr('transform',`translate(${leftTextX},${leftTextY})rotate(-90)`)

    function xMinMax() {
        xMin = d3.min(data, d => parseFloat(d[curX]) * 0.9);
        xMax = d3.max(data, d => parseFloat(d[curX]) * 1.1);
    };
    
    function yMinMax() {
        yMin = d3.min(data, d => parseFloat(d[curY]) * 0.9);
        yMax = d3.max(data, d => parseFloat(d[curY]) * 1.1);
    };

    xMinMax();
    yMinMax();

    var xScale = d3
        .scaleLinear()
        .domain([xMin,xMax])
        .range([margin + labelArea, width - margin]);
    
    var yScale = d3
        .scaleLinear()
        .domain([yMin,yMax])
        .range([height - margin - labelArea, margin]);
    
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    function tickCount() {
        if (width <= 500) {
            xAxis.ticks(5);
            yAxis.ticks(5);
        } else {
            xAxis.ticks(10);
            yAxis.ticks(10);
        }
    };

    tickCount();

    svg
        .append('g')
        .call(xAxis)
        .attr('class','xAxis')
        .attr('transform',`translate(0,${(height - margin - labelArea)})`);
    
    svg
        .append('g')
        .call(yAxis)
        .attr('class','yAxis')
        .attr('transform',`translate(${(margin + labelArea)},0)`);

    var theCircles = svg.selectAll('g theCircles').data(data).enter();

    var circRadius;
    
    function crGet() {
        if (width <= 530) {
            circRadius = 7;
        } else {
            circRadius = 14;
        }
    };

    crGet();
    
    theCircles
        .append('circle')
        .attr('cx',d => xScale(d[curX]))
        .attr('cy',d => yScale(d[curY]))
        .attr('r', circRadius)
        .attr('class',d => `stateCircle ${d.abbr}`);
    
    theCircles
        .append('text')
        .text(d => d.abbr)
        .attr('dx',d => xScale(d[curX]))
        .attr('dy',d => yScale(d[curY]) + circRadius / 2.5)
        .attr('font-size',circRadius)
        .attr('class','stateText');

    

    
});
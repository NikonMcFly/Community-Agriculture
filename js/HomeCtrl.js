'use strict';

app.controller('HomeCtrl', function($scope, $interval){
  $scope.charts = [
    {hour: 0,sales: 0},
    {hour: 1,sales: 54},
    {hour: 2,sales: 66},
    {hour: 3,sales: 77},
    {hour: 4,sales: 70},
    {hour: 5,sales: 60},
    {hour: 6,sales: 63},
    {hour: 7,sales: 55},
    {hour: 8,sales: 47},
    {hour: 9,sales: 55},
    {hour: 10,sales: 30}
  ];

  $interval(function () {
    var hour = $scope.charts.length + 1;
    var sales = Math.round(Math.random() * 100);
    $scope.charts.push({hour: hour, sales: sales});
  }, 1000, 10);

});

app.directive('stockGraph', function(){
  return {
    restrict:'E',
    scope: {data : "="},
    link: function(scope, element, attrs) {
      var lineData = scope.data;
      element = element[0];
      //Width height padding
      var margin = {top: 20, right:100, bottom: 20, left: 100};
      var width = 960 - margin.left - margin.right;
      var height = 500 - margin.top - margin.bottom;
      var xScale = d3.scale.linear()
        .domain([lineData[0].hour, lineData[lineData.length - 1].hour])
        .range([0, 400]);
      var yScale = d3.scale.linear()
        .domain([0, d3.max(lineData, function (d){
          return d.sales;
        })])
        .range([355, 0]);
        // add ticks
      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
        // add ticks
      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
      var line = d3.svg.line()
        .x(function(d) {
          return xScale(d.hour);
          })
        .y(function(d) {
          return yScale(d.sales);
        })
        .interpolate("basis");


      var svg = d3.select(element)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
        .attr("transform", "translate(" + 250 + "," + 400 + ")")
        .attr("class", "x-axis")
        .call(xAxis);

        svg.append("g")
        .attr("transform", "translate(" + 250 + "," + 50 + ")")
        .attr("class", "y-axis")
        .call(yAxis);

        //Create graph
        svg.append("path")
        .attr("d", line(lineData))
        .attr("transform", "translate(" + 250 + "," + 50 + ")")
        .attr("stroke","blue")
        .attr("stroke-width", 8)
        .attr("fill", "none")
        .attr("class", "path");
     }
   }
});

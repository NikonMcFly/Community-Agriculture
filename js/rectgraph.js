"use strict";

app.controller("rectCtrl", function($scope){
  $scope.bars = [{name: "African Americans", value: 42187},
                  {name: "Millenials", value: 257474},
                  {name: "Total", value: 2109363}
                ]; //42187 , 257454 , 2109363
});


app.directive("rectGraph", function(){
  return {
    restrict: 'E',
    scope:{data: "="},
    link: function(scope, element, attr){
      var rectData = scope.data;

      element = element[0];

      var margin = {top: 100, right: 50, bottom: 100, left: 100};
      var outerWidth = 800;
      var outerHeight = 500;

      var innerWidth = outerWidth - margin.left - margin.right; //600
      var innerHeight = outerHeight - margin.top - margin.bottom; //400


      var xScale = d3.scale.linear()
        .domain([0, innerHeight])
        .range([0, innerWidth]);

      // var yScale = d3.scale.ordinal()
      //   .rangeBands([0, innerHeight], barPadding);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .ticks(5)
        .orient("bottom");

      // var yAxis = d3.svg.axis()
      //   .

      var svg = d3.select(element).append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // var box = d3.select(element).append("g")
      //     .attr("class", "legend")
      //     .attr("height", 100)
      //     .attr("width", 180)
      //     .attr("transform", "translate(25, -100)");

      var rect = svg.selectAll("rect")
          .data(rectData)
          .enter()
          .append("rect")
          .attr("x", 0)
          .attr("y", function(d, i) {return i * 80;})
          .attr("height", 50)
          .attr("width", function(d){ return xScale(d.value * .0001);}) //.0001
          .attr("fill", "#2d578b");

          //boxes
      // var box = svg.selectAll("g")
      //     .data(rectData)
      //     .enter()
      //     .append("rect")
      //     .attr("x", 130)
      //     .attr("width", 10)
      //     .attr("height", 10)
      //     .attr("y", function(d, i){ return i * 20;})
      //     .attr("fill", "#2d578b");



      var xAxisG = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(xAxis);

      var TopText = xAxisG.append("text")
        .style("text-anchor", "middle")
        .attr("x", innerWidth / 2)
        .attr("y", -350)
        .attr("class", "label")
        .text("Number of farmers");
    }
  }
});

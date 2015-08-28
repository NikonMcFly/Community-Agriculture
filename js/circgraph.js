"use strict";
// sam gellaitry
app.controller("circCtrl", function($scope){
  $scope.circleData = [
    {name: "Steven", value: 47.8},
    {name: "Courtney", value: 42.5},
    {name: "Shontel", value: 13.6}
  ];
});
// setInterval(function(){
//   $('svg').remove();
//   generatePieChart();
// },2500);
app.directive("circGraph", function(){
  return{
    restrict: 'E',
    scope: {data: "="},
    link: function (scope, element, attrs) {
      var circleData = scope.data;
      var element = element[0];
      var height = 500;
      var width = 960;
      var color = d3.scale.ordinal()
	       .range(["#3399FF", "#BF55EC", "#CF000F", "#E08283"]);
      var Radius = Math.min(width, height);
      var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value});
      var arc = d3.svg.arc()
        .outerRadius(Radius / 2 * 0.9)
        .innerRadius(Radius / 2 * 0.5);
      var svg = d3.select(element).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append('g')
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      //add the <path> for each arc slice
      var arcs = svg.selectAll("path");
      // .data(pie(circleData))
      // .enter().append("path")
      // .style("stroke", "white")
      // .attr("d", arc)
      // .attr("fill", function(d, i) { return color(i); });

      svg.append("text")
      .attr("dy", "0.0em")
      .style("text-anchor", "middle")
      .attr("class", "inner-circle")
  		.attr("fill", "#36454f")
      .text(function(d) { return 'Obesity by race'; });

      // scope.$watch(function(){
      // });

// http://bl.ocks.org/mbostock/1326410
      function arcTween(a) {
      var i =  d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t){
        return arc(i(t));
        };
      }

      scope.$watch("circleData", function(data){
        var duration = 2000;
        arcs = arcs.data(pie(circleData));
        arcs.transition()
          .duration(duration)
          .attrTween('d', arcTween);

        arcs.enter()
          .append("path")
          .style("stroke", "white")
          .attr("fill", function(d, i){
            return color(i) })
          .each(function(d){
              this._current = {
                startAngle: 2 * Math.PI - 0.001,
                endAngle: 2 * Math.PI
              };
            })
          .transition()
          .duration(duration)
          .attrTween("d", arcTween);

        arcs.exit()
          .transition()
          .duration(duration)
          .each(function(d){
            d.startAngle = 2 * Math.PI - 0.001;
            d.endAngle = Math.PI;
          })
          .attrTween("d", arcTween).remove();
      });

      svg.on("click", function(){
        var cir = angular.element(".circle");
        scope.$apply(function(){
          // var num = [3, 4, 5];
          // scope.data = d3.range(num).map(Math.random);
          console.log("Ive been clicked");
        })
      });

    }

  }

});

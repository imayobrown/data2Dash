define(['d3'], 
		function(d3) {
	
	return {
		
		lineGraph: function lineGraph(domElement, data) {
			
			var margin = {top: 20, right: 20, bottom: 30, left: 50},
		    	width = 960 - margin.left - margin.right,
		    	height = 500 - margin.top - margin.bottom;

			var x = d3.scaleTime()
				.range([0, width]);

			var y = d3.scaleLinear()
		    	.range([height, 0]);

			var xAxis = d3.axisBottom()
		    	.scale(x);

			var yAxis = d3.axisLeft()
		    	.scale(y);

			var line = d3.line()
		    	.x(function(d) { return x(d.date); })
		    	.y(function(d) { return y(d.close); });

			var svg = d3.select("body").append("svg")
		    	.attr("width", width + margin.left + margin.right)
		    	.attr("height", height + margin.top + margin.bottom)
		    .append("g")
		    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			//=====================================================
			
			x.domain(d3.extent(data, function(d) { return d.date; }));
			y.domain(d3.extent(data, function(d) { return d.close; }));

			svg.append("g")
				.attr("class", "axis axis--x")
			    .attr("transform", "translate(0," + height + ")")
			    .call(xAxis);

			svg.append("g")
			    .attr("class", "axis axis--y")
			    .call(yAxis)
			  .append("text")
			    .attr("class", "axis-title")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 10)
			    .attr("dy", ".71em")
			    .text("Price ($)");

			svg.append("path")
			    .datum(data)
			    .attr("class", "line")
			    .attr("d", line);
			
		}
	
	};
	
});
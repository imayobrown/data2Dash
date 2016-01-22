define(['d3'], 
		function(d3) {
	
	return {
		
		lineGraph: function lineGraph(domElement, data) {
			
			var numOfLines = data[0].length - 1;

			
			var margin = {top: 20, right: 20, bottom: 30, left: 50},
		    	width = 960 - margin.left - margin.right,
		    	height = 500 - margin.top - margin.bottom;

			/* d3 v4.0
			var x = d3.scaleTime()
				.range([0, width]);

			var y = d3.scaleLinear()
		    	.range([height, 0]);
		    */
			
			//d3 v3.5
			var x = d3.scale.linear()
				.range([0, width])
				.domain([0,10]); //TODO: come up with a better way to find max x domain value on all curves
				//.domain(d3.extent(dummyData, function(d) { return d[0]; }));
			
			var y = d3.scale.linear()
				.range([height, 0])
				.domain([0,10]); //TODO: come up with a better way to find max y domain value on all curves
				//.domain(d3.extent(dummyData, function(d) { return d[1]; }));
			
			/* d3 v4.0
			var xAxis = d3.axisBottom()
		    	.scale(x);

			var yAxis = d3.axisLeft()
		    	.scale(y);	
		    */
			
			//d3 v3.5
			var xAxis = d3.svg.axis()
				.scale(x)
				.orient('bottom');
			
			var yAxis = d3.svg.axis()
				.scale(y)
				.orient('left');

			var svg = d3.select(domElement).append("svg")
				.attr("id", "svg-chart")
		    	.attr("width", width + margin.left + margin.right)
		    	.attr("height", height + margin.top + margin.bottom)
		    .append("g")
		    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			//=====================================================

			svg.append("g")
				.attr("class", "axis axis--x")
			    .attr("transform", "translate(0," + height + ")")
			    .call(xAxis);

			svg.append("g")
			    .attr("class", "axis axis--y")
			    .call(yAxis);
			
			for (var i = 0; i < numOfLines; i++) {
				var line = d3.svg.line()
					.x(function(d) {return d[0];})
					.y(function(d) {return d[i+1];});
				
				svg.append('path')
					.datum(data)
					.attr('class', 'line')
					.attr('d', line);
			}
			
			/*
			//Changed d3.line() to d3.svg.line() --> using d3 v3.5 so need to use d3.svg.line() instead of d3.line()
			var line = d3.svg.line()
		    	.x(function(d) { return x(d[0]); })
		    	.y(function(d) { return y(d[1]); })
		    	.interpolate('cardinal');

			svg.append("path")
			    .datum(dummyData)
			    .attr("class", "line")
			    .attr("d", line);
			*/
			
			
		}
	
	};
	
});
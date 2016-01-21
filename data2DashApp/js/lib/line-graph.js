define(['d3'], 
		function(d3) {
	
	return {
		
		lineGraph: function lineGraph(domElement, originalData) {
			
			//var dummyData = [ [1, 100], [2, 200], [3, 300], [4, 400], [5, 500] ];
			
			var dummyData = originalData;
			
			console.log(dummyData);
			
			var margin = {top: 20, right: 20, bottom: 30, left: 50},
		    	width = 960 - margin.left - margin.right,
		    	height = 500 - margin.top - margin.bottom;
			
			console.log('width: ' + width);
			console.log('height: ' + height);

			/* d3 v4.0
			var x = d3.scaleTime()
				.range([0, width]);

			var y = d3.scaleLinear()
		    	.range([height, 0]);
		    */
			
			//d3 v3.5
			var x = d3.scale.linear()
				.range([0, width])
				.domain(d3.extent(dummyData, function(d) { return d[0]; }));
			
			var y = d3.scale.linear()
				.range([height, 0])
				.domain(d3.extent(dummyData, function(d) { 
					console.log(d[1]);
					return d[1]; }));
			
			console.log(d3.extent(dummyData, function(d) { return d[0]; }));
			
			console.log(d3.extent(dummyData, function(d) { return d[1]; }));
			
			console.log(y.domain());
			console.log(y.range());

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

			//Changed d3.line() to d3.svg.line() --> using d3 v3.5 so need to use d3.svg.line() instead of d3.line()
			var line = d3.svg.line()
		    	.x(function(d) {
		    		//console.log('x value: ' + d[0]);
		    		//console.log('scaled x value: ' + x(d[0]));
		    		return x(d[0]); })
		    	.y(function(d) { 
		    		//console.log('y value: ' + d[1]);
		    		//console.log('scaled y value: ' + y(d[1]));
		    		return y(d[1]); });

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

			svg.append("path")
			    .datum(dummyData)
			    .attr("class", "line")
			    .attr("d", line);
			
		}
	
	};
	
});
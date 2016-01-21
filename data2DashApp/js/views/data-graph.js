define(['underscore', 'jquery', 'backbone', 'data-set', 'text!templates/data-graph.html', 'line-graph', 'd3'], 
		function(_, $, Backbone, DataSet, Template, LineGraph, d3) {
	
	var dataGraph = Backbone.View.extend({
		
		id: 'graph-wrapper',
		
		className: 'container',
		
		initialize: function(dataid, options) {
			
			this.model = new DataSet();
			this.listenTo(this.model, 'change:id', this.idChanged);
			this.listenTo(this.model, 'change:data', this.drawGraph);
			
			if (dataid){
				this.model.set({'id': dataid});
			}
			
			//Add any specified options to object
			_.each(options, function(value, key, list) {
				this[key] = value;
			});
			
		},
		
		template: _.template(Template),
		
		render: function() {
			
			this.$el.html(_.template(Template));
			
			return this;
		},
		
		idChanged: function() {
			this.model.fetch(); //fetch() triggers data change event
		},
		
		drawGraph: function() {
			
			//If chart has already been rendered remove it and re-render it
			if ($('#svg-chart').length) {
				$('#svg-chart').remove();
			}
			//console.log(this.model.get('data'));
			var data = this.model.get('data');
			var parsedData = d3.csv.parseRows(data);
			LineGraph.lineGraph('div.chart-stage', parsedData); //Render chart and add to DOM
		},
		
		setModelID: function(dataid) {
			this.model.set({'id': dataid});
		}
		
	});
	
	return dataGraph;
	
});
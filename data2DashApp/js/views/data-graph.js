define(['underscore', 'jquery', 'backbone', 'datatables.net', 'data-set', 'text!templates/data-graph.html', 'line-graph', 'd3'], 
		function(_, $, Backbone, DataTables, DataSet, Template, LineGraph, d3) {
	
	var dataGraph = Backbone.View.extend({
		
		id: 'graph-wrapper',
		
		className: 'container-fluid',
		
		initialize: function(dataid, options) {
			
			this.model = new DataSet();
			this.listenTo(this.model, 'change:id', this.idChanged);
			this.listenTo(this.model, 'change:data', this.drawGraph);
			this.listenTo(this.model, 'change:data', this.drawTable);
			
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
			
			console.log(Template);
			
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
			LineGraph.lineGraph('div.graph-stage', parsedData); //Render chart and add to DOM
		},
		
		drawTable: function() {
			var csvData = this.model.get('data');
			var dataSet = d3.csv.parseRows(csvData, function(d) {
				var result = [];
				d.forEach(function(currentValue, index, array) {
					result.push(currentValue);
				});
				
				return result;
				
			});
			
			
			if (this.table) {
				console.log('attempting to destroy table');
				this.table.destroy();
				console.log('table destroyed');
			}
			
			
			columns = [
			           {title: '1'},
			           {title: '2'},
			           //{title: '3'},
			           //{title: '4'},
			           //{title: '5'}
			           ];
			
			
			this.table = $('#graph-table').DataTable({
				'data': dataSet, 
				'columns': columns,
				'paging': false,
				'scrollY': true,
				'ordering': false,
				'searching': false,
				'info': false,
				});
			
		},
		
		setModelID: function(dataid) {
			this.model.set({'id': dataid});
		}
		
	});
	
	return dataGraph;
	
});
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
			LineGraph.lineGraph('div.graph-stage', parsedData.slice(1,parsedData.length)); //Render chart and add to DOM
		},
		
		drawTable: function() {
			/*
			 * This function looks at the data in the model and dynamically adds tabs and tables to the view depending on how many traces
			 * are present in the data set.
			 */
			
			var csvData = this.model.get('data');
			
			var data = d3.csv.parseRows(csvData);
			
			var titles = data[0];
			var dataSet = data.slice(1, data.length);
			
			var traceSet = [];
			titles.slice(1, titles.length).forEach(function(currentValue, index, array) { traceSet.push(new Array()); });
			
			dataSet.forEach(function(currentValue, index, array) {
				for (var i = 1; i < currentValue.length; i++) {
					var set = [ currentValue[0], currentValue[i] ];
					traceSet[i - 1].push(set);
				}
			});
			
			//Empty/remove tabs before adding them
			$('#table-tab-headers').empty();
			$('#table-tab-content').empty();
			
			//Dynamically add tab and table for each data trace present in csv json data in model
			for (var i = 1; i < titles.length; i++) {
				
				var liAttrObject = {
						class: function() {
							if (i == 1) {
								return "active";
							}
							else {
								return "";
							}
						}
				};
				
				var aAttrObject = {
						href: "#trace" + i,
						text: "Trace " + i,
				};
				
				var divAttrObject = {
						id: "trace" + i,
						class: function() {
							if (i == 1) {
								return "tab-pane fade in active";
							}
							else {
								return "tab-pane fade";
							}
						},
				};
				
				var tableAttrObject = {
						class: "cell-border dt-body-center",
						id: "trace" + i + "-table",
						//html: "<thead></thead><tbody></tbody>",
				};
				
				//Bind click event to <a> because otherwise it will attempt to change the url and on url change Backbone attempts a reroute
				var newListObject = $('<li>', liAttrObject).append($('<a>', aAttrObject).click(function(e) {
					e.preventDefault();
					$(this).tab('show');
				})
				.on( 'shown.bs.tab', function(e) {
					$.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust(); //On event where tab becomes the one shown, readjust the column widths so that the headers line up correctly with thier corresponding column
				}));
				var newDivObject = $('<div>', divAttrObject).append($('<table>', tableAttrObject));
				
				$('#table-tab-headers').append(newListObject);
				$('#table-tab-content').append(newDivObject);
				
			}
			
			//If tables are already in view destroy them so they can be rerendered
			if (this.tables) {
				this.tables.forEach(function(currentValue, index, array) {
					currentValue.destroy();
				});
			}
			
			//Render tables and return array of references
			this.tables = traceSet.map(function(currentValue, index, array) {
				return $("#trace" + (index + 1) + "-table").DataTable({'data': currentValue, 'columns': [ { title: titles[0] }, { title: titles[index + 1] } ], 'paging': false, 'scrollY': true, 'ordering': false, 'searching': false, 'info': false});
			});
			
			
		},
		
		setModelID: function(dataid) {
			this.model.set({'id': dataid});
		}
		
	});
	
	return dataGraph;
	
});
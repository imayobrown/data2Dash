define(['underscore', 'backbone', 'jquery', 'data-sets', 'data-set', 'text!templates/data-view.html', 'datatables.net', 'datatables.select', 'data-table', 'data-graph'], 
		function(_, Backbone, $, DataSets, DataSet, Template, DataTables, Select, DataTableView, DataGraphView) {
	
	var viewData = Backbone.View.extend({
		
		id: 'data-view-container',
		
		className: 'container',
		
		//Fetch DataSets and bind view functions to collection events. Initialize class variables to DOM elements with jquery objects.
		initialize: function(options) {
			
			//Add any options passed to view to created object
			_.each(options, function(value, key, list) {
				this[key] = value;
			}, this);
			
			this.returnType = 'DataView';
			
			this.collection = DataSets;
			
			this.collection.fetch({ reset: true }); //Fetch data sets all at once and fire reset even when finished
			
			this.dataTableView = new DataTableView(DataSets); //Create data table view
			
			this.dataGraphView = new DataGraphView(); //Create graph view
			
			//Render and add the subviews html to the container view
			this.$el.append(this.dataTableView.render().el);
			this.$el.append(this.dataGraphView.render().el);
			
			//Hide the table and graph in the view to start
			$(this.dataTableView.el).hide();
			$(this.dataGraphView.el).hide();
			
			//When data is selected in subview perform view change to data graph 
			this.listenTo(this.dataTableView, 'data-selected', loadGraphCallback(this));
			
			//Define callback closure to pass parent view instance
			function loadGraphCallback(view) {
				return function(dataid) {
					view.loadGraph();
					Backbone.history.navigate('view-data/datagraph/'+dataid);
				};
			}
			
			
		},
		
		render: function() {
			//Render does not need to be called with any context since it is just a holder for the subviews but it still needs to return *this* object
			return this;
		},
		
		loadTable: function() {
			if ($(this.dataGraphView.el).is(':visible')) {
				$(this.dataGraphView.el).hide();
			}
			$(this.dataTableView.el).show();
		},
		
		loadGraph: function() {
			if ($(this.dataTableView.el).is(':visible')) {
				$(this.dataTableView.el).hide();
			}
			$(this.dataGraphView.el).show();
		},
		
		close: function() {
			this.dataTableView.remove();
			this.dataGraphView.remove();
			this.remove();
		}
		
	});
	
	return viewData;
});
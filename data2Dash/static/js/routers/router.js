define(['underscore', 'backbone', 'data-graph', 'user-table','datatables'],
		function(_, Backbone, DataGraph, UserTable, DataTable) {

	return Backbone.Router.extend({

		routes: {
			'graph(/:id)': 'graph',
			'*defaults': 'routeDefault',
			'table': 'table'
		},
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		},
		
		graph: function(id) {
			var graph;
			var graphString = 'graph';
			
			if(!$('body > .application > .data-graph').length) {
				Backbone.trigger('global:app-view:close');
				graph = new DataGraph();
				$('body > .application').append(graph.render());
			}
			
			Backbone.trigger('data-graph:retrieve-data', id);
			Backbone.history.navigate(graphString.concat('/',id));
		},
		
		table: function() {
			//user = typeof user !== 'undefined' ? user : ""; //This line sets a default value for user if one is not supplied.
			var table;
			if (!$('.table-wrapper').length){
				Backbone.trigger('global:app-view:close');
				table = new UserTable();
				$('body > .table').append(table.render());
				Backbone.trigger('user-table:retrieve-data');
			}
			
			Backbone.history.navigate('table');
		},
		
		routeDefault: function() {
			this.table();
			Backbone.history.navigate('table');
		}
	});
});
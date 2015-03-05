define(['underscore', 'backbone', 'data-graph', 'user-table','datatables'],
		function(_, Backbone, DataGraph, UserTable, DataTable) {

	return Backbone.Router.extend({

		routes: {
			'graph(/:id)': 'graph',
			'*defaults': 'routeDefault',
			'table(/:user)': 'table'
		},
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		},
		
		graph: function(id) {
			var graph;
			
			if(!$('body > .application > .data-graph').length) {
				Backbone.trigger('global:app-view:close');
				graph = new DataGraph();
				$('body > .application').append(graph.render());
			}
			
			Backbone.trigger('data-graph:retrieve-data', id);
			Backbone.history.navigate('graph');
		},
		
		table: function(user) {
			var table;
			
			table = new UserTable();
			$('body > .table').append(table.render());
			
			Backbone.trigger('user-table:retrieve-data', user);
			Backbone.history.navigate('table');
		},
		
		routeDefault: function() {
			this.table();
			//this.graph();
			//Backbone.history.navigate("graph");
		}
	});
});
define(['underscore', 'backbone', 'data-graph'],
		function(_, Backbone, DataGraph) {

	return Backbone.Router.extend({

		routes: {
			'graph(/:id)': 'graph',
			'*default': 'routeDefault'
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
		},
		
		routeDefault: function() {
			this.graph();
			Backbone.history.navigate("graph");
		}
	});
});
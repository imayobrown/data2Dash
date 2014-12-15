define(['underscore', 'backbone'],
		function(_, Backbone) {

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
			console.log('graph', id);
		},
		
		routeDefault: function() {
			this.graph();
			Backbone.history.navigate("graph");
		}
	});
});
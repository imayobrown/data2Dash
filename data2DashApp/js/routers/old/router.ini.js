define(['underscore', 'backbone'],
		function(_, Backbone) {

	return Backbone.Router.extend({

		routes: {
			
		},
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		}
	});
});
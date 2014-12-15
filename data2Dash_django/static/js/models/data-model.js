define(['underscore', 'backbone'],
		function(_, Backbone) {

	return Backbone.Model.extend({

		defaults: function() {
			return {
				Header: [],
				Traces: {}
			}
		},
		
		initialize: function(attributes, options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		}
	});
});
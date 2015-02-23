define(['underscore', 'backbone'],
		function(_, Backbone) {

	return Backbone.Model.extend({

		defaults: {
			
		},
		
		initialize: function(attributes, options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		}
	});
});
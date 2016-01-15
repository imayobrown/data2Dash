define(['underscore', 'backbone'],
		function(_, Backbone) {

	return Backbone.Model.extend({

		defaults: function() {
			return {
				active: true,
				data: [],
				label: 'empty'
			}
		},
		
		initialize: function(attributes, options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		}
	});
});
define(['underscore', 'backbone'],
		function(_, Backbone) {

	return Backbone.Collection.extend({

		initialize: function(models, options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		}
	});
});
define(['underscore', 'backbone', 'flot-series'],
		function(_, Backbone, FlotSeries) {

	return Backbone.Collection.extend({
		
		model: FlotSeries,

		initialize: function(models, options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		}
	});
});
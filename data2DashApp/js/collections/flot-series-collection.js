define(['underscore', 'backbone', 'flot-series'],
		function(_, Backbone, FlotSeries) {

	var flotSeriesCollection = Backbone.Collection.extend({
		
		model: FlotSeries,

		initialize: function(models, options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		}
	});
	
	return flotSeriesCollection;
});
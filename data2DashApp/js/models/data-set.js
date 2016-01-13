define(['underscore', 'backbone'], function(_, Backbone) {
	
	var dataSet = Backbone.Model.extend({
		
		initialize: function(options) {
			_.each(options, function(value, key, list) {
				this[key] = value;
				
			}, this);
		},
	});
	
	return dataSet;
});
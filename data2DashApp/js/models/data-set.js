define(['underscore', 'backbone'], function(_, Backbone) {
	
	var dataSet = Backbone.Model.extend({
		
		urlRoot: 'http://127.0.0.1:8000/data',
		
		initialize: function(options) {
			_.each(options, function(value, key, list) {
				this[key] = value;
				
			}, this);
		},
		
		validate: function(attributes, options) {
			var supportedDataTypes = ['csv'];
			/*
			if (!(attributes['dataType'] in supportedDataTypes)) {
				return "ERROR: file data type not supported";
			}
			*/
		},
		
	});
	
	return dataSet;
});
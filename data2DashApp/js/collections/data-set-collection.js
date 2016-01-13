define(['underscore', 'Backbone'], function(_, Backbone) {
	
	var dataSetCollection = Backbone.Collection.extend({
		
		url: 'data/',
		
		initialize: function(options) {
			_.each(options, function(value, key, list){
				this[key] = value;
			}, this);
		},
		
		
	});
	
	return dataSetCollection;
});
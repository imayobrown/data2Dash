define(['underscore', 'backbone', 'data-set'], function(_, Backbone, DataSet) {
	
	var dataSetCollection = Backbone.Collection.extend({
		
		model: DataSet,
		
		url: 'http://127.0.0.1:8000/data/',
		
		initialize: function(options) {
			_.each(options, function(value, key, list){
				this[key] = value;
			}, this);
		},
		
		
	});
	
	return new dataSetCollection();
});
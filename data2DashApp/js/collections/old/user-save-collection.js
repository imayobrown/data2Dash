define(['underscore','backbone','user-save'],
		function(_,Backbone){
	
	return Backbone.Collection.extend({
		
		model: user-save,
		
		initialize: function(attributes, options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		},
		
	});
});
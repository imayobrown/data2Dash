define(['underscore','backbone'],
		function(_,Backbone){
	
	return Backbone.Model.extend({
		
		defaults: function() {
			return {
				'data': []
			};
		},
		
		user: '',
		
		initialize: function(attributes, options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		},
		
		sync: function(method, model, options) {
			var jqXHR;
			
			if (options.view.currentRequest){
				options.view.currentRequest.abort();
			}
			
			jqXHR = $.ajax({
				url: '/user/',
				datatype: 'json',
				success: function(data){
					model.set(data);
					Backbone.trigger('user-table:model-updated');
				},
				error: function(){
					
				}
			}).done(function(){
				options.view.currentRequest = null;
			});
			
			options.view.currentRequest = jqXHR;
		}
		
	});
});
define(['underscore', 'backbone'],
		function(_, Backbone) {

	var model = Backbone.Model.extend({

		/*
		defaults: function() {
			return {
				Header: [],
				Traces: {}
			};
		},
		*/
		
		initialize: function(attributes, options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		},
		
		/*
		sync: function(method, model, options) {
			var jqXHR;
			var url = '/data_get/'.concat(this.id);
			
			if(options.view.currentRequest) {
				options.view.currentRequest.abort();
			}
			
			jqXHR = $.ajax({
				url: url,
				dataType: 'json',
				success: function(data) {
					model.set(data);
					Backbone.trigger('data-graph:model-updated');
				},
				error: function() {
					
				}
			}).done(function() {
				options.view.currentRequest = null;
			});
			
			options.view.currentRequest = jqXHR;
			
		}
		*/
		
	});
	
	return model;
});
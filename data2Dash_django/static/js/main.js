require.config({
	
	shim: {
		bootstrap: ['jquery'],
		flot: ['jquery'],
		'flot-resize': ['jquery', 'flot']
	},
	
	paths: {
		jquery: 'plugins/jquery.min',
		bootstrap: 'plugins/bootstrap.min',
		backbone: 'plugins/backbone',
		underscore: 'plugins/underscore-min',
		flot: 'plugins/jquery.flot',
		'flot-resize': 'plugins/jquery.flot.resize',
		router: 'routers/router',
		text: 'plugins/text',
		'data-graph': 'views/data-graph',
		'data-model': 'models/data-model',
		'flot-series': 'models/flot-series',
		'flot-series-collection': 'collections/flot-series-collection'
	}
});

require(['app', 'backbone'], function(App, Backbone) {

	Backbone.View.prototype.close = function() {
		if(this.onClose) this.onClose();
		this.remove();
		this.unbind();
	};
	
	Backbone.sync = function(method, model, options) {
		var jqXHR;
		
		if(options.view.currentRequest) {
			options.view.currentRequest.abort();
		}
		
		jqXHR = $.ajax({
			url: '/static/json/example.json',
			dataType: 'json',
			success: function(data) {
				model.set(data);
			},
			error: function() {
				
			}
		}).done(function() {
			options.view.currentRequest = null;
		});
		
		options.view.currentRequest = jqXHR;
	};
	
	App.start();
});

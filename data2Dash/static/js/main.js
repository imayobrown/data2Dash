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
		'user-table': 'views/user-table',
		'flot-series-view': 'views/flot-series-view',
		'flot-series-collection-view': 'views/flot-series-collection-view',
		'data-model': 'models/data-model',
		'flot-series': 'models/flot-series',
		'user-save': 'models/user-save',
		'flot-series-collection': 'collections/flot-series-collection'
	}
});

require(['app', 'backbone'], function(App, Backbone) {

	Backbone.View.prototype.close = function() {
		if(this.onClose) this.onClose();
		this.remove();
		this.unbind();
	};
	/*
	Backbone.sync = function(method, model, options) {
		var jqXHR;
		alert('global fetch executed');
		if(options.view.currentRequest) {
			options.view.currentRequest.abort();
		}
		
		jqXHR = $.ajax({
			url: '/data_get/',
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
	};
	*/
	App.start();
});

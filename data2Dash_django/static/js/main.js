require.config({
	
	shim: {
		bootstrap: ['jquery'],
		flot: ['jquery']
	},
	
	paths: {
		jquery: 'plugins/jquery.min',
		bootstrap: 'plugins/bootstrap.min',
		backbone: 'plugins/backbone',
		underscore: 'plugins/underscore-min',
		flot: 'plugins/jquery.flot',
		router: 'routers/router'
	}
});

require(['app', 'backbone'], function(App, Backbone) {

	Backbone.View.prototype.close = function() {
		if(this.onClose) this.onClose();
		this.remove();
		this.unbind();
	};
	
	Backbone.sync = function(method, model, options) {
		
	};
	
	App.start();
});

require.config({
	
	shim: {
		bootstrap: ['jquery'],
		//flot: ['jquery'],
		//'flot-resize': ['jquery', 'flot'],
		'datatables.net': ['jquery'],
		'datatables.select': ['jquery', 'datatables.net'],
	},
	
	paths: {
		jquery: 'plugins/jquery.min',
		bootstrap: 'plugins/bootstrap.min',
		backbone: 'plugins/backbone',
		underscore: 'plugins/underscore-min',
		text: 'plugins/text',
		router: 'routers/router',
		home: 'views/home',
		'data-set': 'models/data-set',
		'data-sets': 'collections/data-sets',
		'data-view': 'views/data-view',
		'data-input': 'views/data-input',
		'datatables.net': 'plugins/datatables',
		'datatables.select': 'plugins/datatables/dataTables.select',
		'data-table': 'views/data-table'
	}
});

require(['app', 'backbone', 'bootstrap'], function(App, Backbone, Bootstrap) {

	Backbone.View.prototype.close = function() {
		if(this.onClose) this.onClose();
		this.remove();
		this.unbind();
	};
	
	App.start();
});

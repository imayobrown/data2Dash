require.config({
	
	shim: {
		bootstrap: ['jquery'],
		'datatables.net': ['jquery'],
		'datatables.select': ['jquery', 'datatables.net'],
	},
	
	paths: {
		jquery: 'plugins/jquery.min',
		dropzone: 'plugins/dropzone',
		bootstrap: 'plugins/bootstrap.min',
		backbone: 'plugins/backbone',
		underscore: 'plugins/underscore-min',
		text: 'plugins/text',
		router: 'routers/router',
		home: 'views/home',
		d3: 'plugins/d3.min',
		'data-set': 'models/data-set',
		'data-sets': 'collections/data-sets',
		'data-view': 'views/data-view',
		'data-input': 'views/data-input',
		'datatables.net': 'plugins/datatables',
		'datatables.select': 'plugins/datatables/dataTables.select',
		'data-table': 'views/data-table',
		'data-graph': 'views/data-graph',
		'line-graph': 'lib/line-graph'
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

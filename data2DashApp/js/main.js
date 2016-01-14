require.config({
	
	shim: {
		bootstrap: ['jquery'],
		//flot: ['jquery'],
		//'flot-resize': ['jquery', 'flot'],
		//datatables: ['jquery']
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
		//flot: 'plugins/jquery.flot',
		//'flot-resize': 'plugins/jquery.flot.resize',
		//'datatables': 'plugins/jquery.dataTables',
		//router: 'routers/router',
		//'data-graph': 'views/data-graph',
		//'user-table': 'views/user-table',
		//'flot-series-view': 'views/flot-series-view',
		//'flot-series-collection-view': 'views/flot-series-collection-view',
		//'data-model': 'models/data-model',
		//'flot-series': 'models/flot-series',
		//'user-save': 'models/user-save',
		//'flot-series-collection': 'collections/flot-series-collection',
		//'s2p-input-form': 'views/s2p-input-form'
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

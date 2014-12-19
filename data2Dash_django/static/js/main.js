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
		'data-model': 'models/data-model'
	}
});

require(['app', 'backbone'], function(App, Backbone) {

	Backbone.View.prototype.close = function() {
		if(this.onClose) this.onClose();
		this.remove();
		this.unbind();
	};
	
	Backbone.sync = function(method, model, options) {
		console.log(arguments);
		
		/*
		$.ajax({
			url: '/static/json/example.json',
			dataType: 'json',
			success: function(data) {
				self.model.set(data);
				var plot;
				
				plot = [];
				_.each(data.Traces, function(dataPoints, name) {
					plot.push({
						label: name,
						data: dataPoints
					});
				});
				
				self.$('.chart-stage').plot(plot);
				console.log(data);
			}
		});
		*/
	};
	
	App.start();
});

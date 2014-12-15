define(['jquery', 'underscore', 'backbone',
        'text!templates/data-graph.html', 'flot'],
		function($, _, Backbone, Template, Flot) {

	return Backbone.View.extend({

		className: 'row app-view data-graph',
		
		template: _.template(Template),
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
			this.listenTo(Backbone, 'all', this.globalEventHandler);
		},
		
		render: function() {
			this.$el.html(this.template());
			return this.$el;
		},
		
		globalEventHandler: function(event, data) {
			if(this[event]) this[event](data);
		},
		
		'data-graph:retrieve-data': function(id) {
			var self;
			
			self = this;
			
			$.ajax({
				url: '/static/json/example.json',
				dataType: 'json',
				success: function(data) {
					var plot;
					
					plot = [];
					_.each(data.Traces, function(dataPoints, name) {
						plot.push({
							label: name,
							data: dataPoints
						});
					});
					
					self.$('.chart-stage').plot(plot);
					console.log(plot);
				}
			});
		}
	});
});
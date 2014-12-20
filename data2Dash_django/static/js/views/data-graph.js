define(['jquery', 'underscore', 'backbone',
        'text!templates/data-graph.html', 'flot',
        'data-model', 'flot-series-collection-view',
        'flot-resize'],
		function($, _, Backbone, Template, Flot, DataModel,
					FlotSeriesCollectionView) {

	return Backbone.View.extend({

		className: 'row app-view data-graph',
		
		template: _.template(Template),
		
		currentRequest: null,
		plot: null,
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
			this.model = new DataModel();
			this.listenTo(Backbone, 'all', this.globalEventHandler);
		},
		
		render: function() {
			var seriesCollectionView;
			
			this.$el.html(this.template());
			
			seriesCollectionView = new FlotSeriesCollectionView();
			this.$('.chart-notes').append(seriesCollectionView.render());
			
			return this.$el;
		},
		
		updateSeries: function() {
			var seriesCollection, color;
			
			color = 0;
			seriesCollection = [];
			
			_.each(this.model.get('Traces'), function(data, label) {
				seriesCollection.push({
					label: label,
					data: data,
					color: color++
				});
			});
			
			Backbone.trigger('data-graph:series-updated', seriesCollection);
			Backbone.trigger('flot-series-collection:series-updated', seriesCollection);
		},
		
		globalEventHandler: function(event, data) {
			if(this[event]) this[event](data);
		},
		
		'data-graph:model-updated': function() {
			this.updateSeries();
		},
		
		'data-graph:series-updated': function(data) {
			this.$('.chart-stage').plot(data);
		},
		
		'data-graph:retrieve-data': function(id) {
			this.model.set({id: id});
			this.model.fetch({view: this});
		}
	});
});
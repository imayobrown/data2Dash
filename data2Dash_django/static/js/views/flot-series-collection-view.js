define(['jquery', 'underscore', 'backbone',
        'text!templates/flot-series-collection-view.html',
        'flot-series-collection', 'flot-series-view'],
		function($, _, Backbone, Template, FlotSeriesCollection,
					FlotSeriesView) {

	return Backbone.View.extend({

		template: _.template(Template),
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
			this.collection = new FlotSeriesCollection();
			this.listenTo(this.collection, 'all', this.collectionEventHandler);
			this.listenTo(Backbone, 'all', this.globalEventHandler);
		},
		
		render: function() {
			this.$el.html(this.template());
			return this.$el;
		},
		
		collectionEventHandler: function(event) {
			var model;

			switch(event) {
				case 'add':
					model = arguments[1];
					this.$('.collection-body')
						.append(new FlotSeriesView({model: model}).render());
					break;
				default:
					break;
			}
		},
		
		globalEventHandler: function(event, data) {
			if(this[event]) this[event](data);
		},
		
		'flot-series-collection:series-updated': function(data) {
			this.collection.set(data);
		},
		
		'flot-series:updated': function() {
			var seriesCollection;
			
			seriesCollection = [];
			
			_.each(this.collection.where({active: true}), function(model, index) {
				seriesCollection.push(model.toJSON());
			});
			
			Backbone.trigger('data-graph:series-updated', seriesCollection);
		}
	});
});
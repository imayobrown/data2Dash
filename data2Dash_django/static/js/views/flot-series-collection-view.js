define(['jquery', 'underscore', 'backbone',
        'text!templates/flot-series-collection-view.html',
        'flot-series-collection', 'flot-series-view'],
		function($, _, Backbone, Template, FlotSeriesCollection,
					FlotSeriesView) {

	return Backbone.View.extend({

		template: _.template(Template),
		
		events: {
			'click input.select-all': 'toggleAll'
		},
		
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
		
		updateSelectAll: function(allSelected) {
			this.$('input.select-all').prop('checked', allSelected);
		},
		
		toggleAll: function(e) {
			var active;
			
			active = e.currentTarget.checked;
			
			_.each(this.collection.models, function(model, index) {
				model.set({active: active});
			});
			
			Backbone.trigger('flot-series:updated');
		},
		
		globalEventHandler: function(event, data) {
			if(this[event]) this[event](data);
		},
		
		'flot-series-collection:series-updated': function(data) {
			this.updateSelectAll(true);
			this.collection.set(data);
		},
		
		'flot-series:updated': function() {
			var seriesCollection, active, allSelected;
			
			seriesCollection = [];
			active = this.collection.where({active: true});
			allSelected = active.length/this.collection.length == 1;
			
			this.updateSelectAll(allSelected);
			
			_.each(active, function(model, index) {
				seriesCollection.push(model.toJSON());
			});
			
			Backbone.trigger('data-graph:series-updated', seriesCollection);
		}
	});
});
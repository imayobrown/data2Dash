define(['jquery', 'underscore', 'backbone',
        'text!templates/flot-series-collection-view.html',
        'flot-series-collection'],
		function($, _, Backbone, Template, FlotSeriesCollection) {

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
			
		},
		
		globalEventHandler: function(event, data) {
			if(this[event]) this[event](data);
		}
	});
});
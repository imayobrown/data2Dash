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
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
			this.model = new DataModel();
			this.listenTo(this.model, 'all', this.modelEventHandler);
			this.listenTo(Backbone, 'all', this.globalEventHandler);
		},
		
		render: function() {
			var seriesCollectionView;
			
			this.$el.html(this.template());
			
			seriesCollectionView = new FlotSeriesCollectionView();
			this.$('.chart-notes').append(seriesCollectionView.render());
			
			return this.$el;
		},
		
		modelEventHandler: function(event) {
			switch(event) {
				case 'change:Header':
					break;
				case 'change:Traces':
					break;
				default:
					break;
			};
		},
		
		globalEventHandler: function(event, data) {
			if(this[event]) this[event](data);
		},
		
		'data-graph:retrieve-data': function(id) {
			this.model.set({id: id});
			this.model.fetch({view: this});
		}
	});
});
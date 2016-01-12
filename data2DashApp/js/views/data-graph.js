define(['jquery', 'underscore', 'backbone',
        'text!templates/data-graph.html', 'flot',
        'data-model', 'flot-series-collection-view',
        'flot-resize'],
		function($, _, Backbone, Template, Flot, DataModel,
					FlotSeriesCollectionView) {

	return Backbone.View.extend({

		className: 'row app-view data-graph',
		
		events: {
			'plothover':  'displayOnHover'
		},
		
		template: _.template(Template),
		
		currentRequest: null,
		
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
			
			$('<div class="hover-tooltip"></div>').css({
				position: 'absolute',
				display: 'none',
				border: '1px solid #fdd',
				padding: '2px',
				'background-color': '#fee',
				opacity: 0.95
			}).appendTo(this.$el);
			
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
		
		displayOnHover: function(event, pos, item) {
			if(item) {
				var x, y;
				
				x = item.datapoint[0].toFixed(2);
				y = item.datapoint[1].toFixed(2);
				
				this.$('.hover-tooltip').html('x: ' + x + ', y: ' + y)
					.css({top: item.pageY+5, left: item.pageX+5})
					.fadeIn(200);
			} else {
				this.$('.hover-tooltip').hide();
			}
		},
		
		globalEventHandler: function(event, data) {
			if(this[event]) this[event](data);
		},
		
		'data-graph:model-updated': function() {
			this.$('.chart-title').html(this.model.get('Header').join());
			this.updateSeries();
		},
		
		'data-graph:series-updated': function(data) {
			this.$('.chart-stage').plot(data, {
				grid: {
					hoverable: true,
					margin: 25
				}
			});
			
			var xaxisLabel = $("<div class='axisLabel xaxisLabel'></div>")
			  .text("Frequency (Hz)")
			  .appendTo($('.chart-stage'));

			var yaxisLabel = $("<div class='axisLabel yaxisLabel'></div>")
			  .text("Loss (dB)")
			  .appendTo($('.chart-stage'));
		},
		
		'data-graph:retrieve-data': function(id) {
			this.model.set({id: id});
			this.model.fetch({view: this});
		},
		
		'data-graph:remove': function(){
			this.remove();
		},
		
		'global:app-view:close': function() {
			this.remove();
		}
	});
});
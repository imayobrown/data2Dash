define(['jquery', 'underscore', 'backbone',
        'flot-series', 'text!templates/flot-series-view.html'],
		function($, _, Backbone, FlotSeries, Template) {

	return Backbone.View.extend({

		className: 'form-group',
		
		template: _.template(Template),
		
		events: {
			'click input.toggle-active': 'toggleActive'
		},
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
			this.model = this.model || new FlotSeries();
			this.listenTo(this.model, 'all', this.modelEventHandler);
		},
		
		render: function() {
			var self;
			
			self = this;
			this.$el.html(this.template({
				model: self.model.toJSON()
			}));
			
			return this.$el;
		},
		
		toggleActive: function(e) {
			this.model.set({active: e.currentTarget.checked});
			Backbone.trigger('flot-series:updated');
		},
		
		modelEventHandler: function(event) {
			switch(event) {
				case 'remove':
					this.close();
				default:
					break;
			}
		}
	});
});
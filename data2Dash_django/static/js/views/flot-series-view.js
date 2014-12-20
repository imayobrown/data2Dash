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
			this.model.set({active: e.currentTarget.checked}, {silent: true});
			Backbone.trigger('flot-series:updated');
		},
		
		updateToggle: function(active) {
			this.$('.toggle-active').prop('checked', active);
		},
		
		modelEventHandler: function(event) {
			var active;
			
			switch(event) {
				case 'remove':
					this.close();
				case 'change:active':
					active = arguments[2];
					this.updateToggle(active);
				default:
					break;
			}
		}
	});
});
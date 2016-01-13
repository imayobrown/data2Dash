define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {
	
	var viewData = Backbone.View.extend({
		
		initialize: function(options) {
			_.each(options, function(value, key, list) {
				this[key] = value;
			}, this);
			
			
		},
		
		template: _.template(Template),
		
		render: function() {
			this.$el.html(this.template());
			
			return this;
		}
	});
	
	return viewData;
});
define(['jquery', 'underscore', 'backbone'],
		function($, _, Backbone) {

	return Backbone.View.extend({

		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		},
		
		render: function() {
			
		}
	});
});
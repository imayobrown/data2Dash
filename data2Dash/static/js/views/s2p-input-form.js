define(['jquery','underscore','backbone',
        'text!templates/s2p-input-form.html'],
        function($,_,Backbone,Template){
	
	return Backbone.View.extend({
		
		className: "container-fluid row app-view s2p-input-form",
		
		template: _.template(Template),
		
		render: function(){
			this.$el.html(this.template());
			
			return this.$el;
		},
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
		},
	});
});
define(['jquery', 'backbone', 'underscore', 'text!templates/home.html'], function($, Backbone, _, Template) {
	
	var homeView = Backbone.View.extend({
		
		className: "home",
		
		initialize: function(){
			
		},
		
		render: function() {
			this.$el.html(_.template(Template));
			return this;
		}
	});
	
	return homeView;
});
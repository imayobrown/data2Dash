define(['router'], function(Router) {
	
	return {
		
		start: function() {
			var router;
			router = new Router();
			Backbone.history.start();
		}
	};
});

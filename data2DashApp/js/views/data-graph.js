define(['underscore', 'jquery', 'backbone', 'data-set', 'text!templates/data-graph.html'], function(_, $, Backbone, DataSet, Template) {
	
	var dataGraph = Backbone.View.extend({
		
		initialize: function(dataid, options) {
			
			this.model = new DataSet({'id': dataid});
			
			this.model.fetch();
			
			//console.log(this.model);
			
			//Add any specified options to object
			_.each(options, function(value, key, list) {
				this[key] = value;
			});
			
		},
		
		template: _.template(Template),
		
		render: function() {
			
			this.$el.html(_.template(Template));
			
			return this;
		},
		
	});
	
	return dataGraph;
	
});
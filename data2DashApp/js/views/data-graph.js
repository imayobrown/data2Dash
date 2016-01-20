define(['underscore', 'jquery', 'backbone', 'data-set', 'text!templates/data-graph.html'], 
		function(_, $, Backbone, DataSet, Template) {
	
	var dataGraph = Backbone.View.extend({
		
		id: 'graph-wrapper',
		
		className: 'container',
		
		initialize: function(dataid, options) {
			
			this.model = new DataSet();
			this.listenTo(this.model, 'change:id', this.idChanged);
			
			if (dataid){
				this.model.set({'id': dataid});
			}
			
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
		
		idChanged: function() {
			this.model.fetch();
		},
		
		setModelID: function(dataid) {
			this.model.set({'id': dataid});
		}
		
	});
	
	return dataGraph;
	
});
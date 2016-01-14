define(['underscore', 'backbone', 'jquery', 'data-sets', 'data-set'], function(_, Backbone, $, DataSets, DataSet) {
	
	var viewData = Backbone.View.extend({
		
		//Fetch DataSets and bind view functions to collection events. Initialize class variables to DOM elements with jquery objects.
		initialize: function(options) {
			
			//Add any options passed to view to created object
			_.each(options, function(value, key, list) {
				this[key] = value;
			}, this);
			
			this.listenTo(DataSets, 'reset', this.render); //Bind reset event to
			
			DataSets.fetch({ reset: true }); //Fetch data sets all at once and fire reset even when finished
		},
		
		template: _.template("<p>This is a place holder to the data-view html</p>"),
		
		render: function() {
			this.$el.html(this.template());
			
			return this;
		}
	});
	
	return viewData;
});
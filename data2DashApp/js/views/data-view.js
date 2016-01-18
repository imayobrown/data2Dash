define(['underscore', 'backbone', 'jquery', 'data-sets', 'data-set', 'text!templates/data-view.html', 'datatables.net', 'datatables.select', 'data-table'], function(_, Backbone, $, DataSets, DataSet, Template, DataTables, Select, DataTableView) {
	
	var viewData = Backbone.View.extend({
		
		//Fetch DataSets and bind view functions to collection events. Initialize class variables to DOM elements with jquery objects.
		initialize: function(options) {
			
			//Add any options passed to view to created object
			_.each(options, function(value, key, list) {
				this[key] = value;
			}, this);
			
			this.$el.html(this.template());
			
			var startView = new DataTableView(DataSets);
			
			DataSets.fetch({ reset: true }); //Fetch data sets all at once and fire reset even when finished
			
			this.loadSubView(startView);
			
			
		},
		
		template: _.template(Template),
		
		render: function() {
			//Render does not need to be called with any context since it is just a holder for the subviews but it still needs to return this object
			return this;
		},
		
		loadSubView: function(subView) {
			if (this.subView) {
				this.subView.remove();
			}
			this.subView = subView;
			this.$el.append(this.subView.render().el);
		},
		
		close: function() {
			this.subView.remove();
			this.remove();
		}
		
	});
	
	return viewData;
});
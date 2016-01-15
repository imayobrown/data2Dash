define(['underscore', 'backbone', 'jquery', 'data-sets', 'data-set', 'text!templates/data-view.html', 'datatables.net', 'datatables.select'], function(_, Backbone, $, DataSets, DataSet, Template, DataTables) {
	
	var viewData = Backbone.View.extend({
		
		//Fetch DataSets and bind view functions to collection events. Initialize class variables to DOM elements with jquery objects.
		initialize: function(options) {
			
			//Add any options passed to view to created object
			_.each(options, function(value, key, list) {
				this[key] = value;
			}, this);
			
			this.listenTo(DataSets, 'reset', this.render); //Bind reset event to view render
			
			this.$el.html(this.template()); //Set html of element
			
			DataSets.fetch({ reset: true, success: this.renderTable}); //Fetch data sets all at once and fire reset even when finished
			
		},
		
		template: _.template(Template),
		
		render: function() {
			this.$el.html(this.template());
			
			return this;
		},
		
		renderTable: function() {
			var columns = [
			               { data: 'user', title: 'User'},
			               { data: 'dataType', title: 'Data Type'},
			               { data: 'datetime', title: 'Date'},
			               { data: 'comment', title: 'Comment'}
			               ];//Setup columns for data tables
			
			this.table = this.$('#data-set-table').DataTable({'columns': columns, 'data': DataSets.models, select: {style: 'single', blurable: true}});
			
			//Bind callback to select event that changes view to display data in chart
			table.on('select', function(e, dt, type, indexes) {
				var data = table.row(indexes).data();
				console.log(data.dataid);
			});
		},
		
	});
	
	return viewData;
});
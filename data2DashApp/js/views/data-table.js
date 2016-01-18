define(['underscore','jquery', 'backbone', 'text!templates/data-table.html', 'datatables.net', 'datatables.select'], function(_, $, Backbone, Template, DataTables, Select) {
	
	var dataTable = Backbone.View.extend({
		
		//Need to pass collection to data table from parent view
		initialize: function(dataSets, options) {
			
			this.dataSets = dataSets; //Add data sets collection to object
			
			_.each(options, function(value, key, list) {
				this[key] = value;
			}, this);
			
			this.$el.html(this.template()); //Set html of view
			
			this.listenTo(dataSets, 'reset', this.render);
			
		},
		
		template: _.template(Template),
		
		render: function() {
			
			var columns = [
			               { data: 'user', title: 'User'},
			               { data: 'dataType', title: 'Data Type'},
			               { data: 'datetime', title: 'Date'},
			               { data: 'comment', title: 'Comment'}
			               ];//Setup columns for data tables
			
			
			if (this.table) {
				this.table.off( 'select' ); //Need to manually remove the event listeners because destroy() does not do so (even though docs says it does)
				this.table.destroy(); //Destroy table so that it can be remade on rerenders
			}
			
			
			//Initialize table
			this.table = this.$('#data-set-table').DataTable({'columns': columns, 'data': this.dataSets.models, select: {style: 'single', blurable: true}});
			
			//Bind callback to select event that changes view to display data in chart
			this.table.on('select', changeToGraph(this.table)); //A closure is used to define this.table in the callback functions namespace
			
			//Closure function that allows passing of table to callback. this.table will not work inside callback because it references its own object
			function changeToGraph(table) {
				return function(e, dt, type, indexes) {
					var data = table.rows( indexes ).data();
					console.log(data);
				};
			}
			
			return this;
		},
		
		
	});
	
	return dataTable;
	
});
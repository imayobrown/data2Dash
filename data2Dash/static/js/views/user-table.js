define(['jquery','underscore','backbone',
        'text!templates/user-table.html','user-save', 'datatables','router'],
		function($,_,Backbone,Template,UserSave, DataTable, Router){
	
	return Backbone.View.extend({
		
		className: 'user-table',
		
		template: _.template(Template),
		
		currentRequest: null,
		
		table: DataTable.Api,
		
		events: {
			'click .btn': 'user-table:view-graph',
		},
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
			this.model = new UserSave();
			this.listenTo(Backbone, 'all', this.globalEventHandler);
		},
		
		render: function(){
			this.$el.html(this.template());
			
			return this.$el;
		},
		
		globalEventHandler: function(event, data) {
			if(this[event]) this[event](data);
		},
		
		'user-table:retrieve-data': function()	{
			this.model.fetch({view: this});
		},
		
		'user-table:model-updated': function() {
			var columns = [
			               {'title': 'ID'},
			               {'title': 'User'},
			               {'title': 'Unit'},
			               {'title': 'Serial Number'},
			               {'title': 'Comment'}
			               ];
			var tableData = {'data': this.model.get('data'), 'columns': columns};
			this.table = this.$('.usertable').DataTable(tableData);
		},
		
		'user-table:view-graph': function() {
			var graph = this.$('.form-control').val();
			alert('button click event fired. ' + graph);
			Backbone.history.navigate('graph/'+graph, {trigger: true});
		}
		
	});
});
define(['jquery','underscore','backbone',
        'text!templates/user-table.html','user-save', 'datatables'],
		function($,_,Backbone,Template,UserSave, DataTable){
	
	return Backbone.View.extend({
		
		className: 'user-table',
		
		template: _.template(Template),
		
		currentRequest: null,
		
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
		
		'user-table:retrieve-data': function(user)	{
			this.model.set({user: user});
			this.model.fetch({view: this});
		},
		
		'user-table:model-updated': function() {
			//Is there better way to construct row?
			/*
			var startTablerow = '<tr>';
			var endTablerow='</tr>';
			var startTabledata = '<td>';
			var endTabledata= '</td>';
			var user = startTabledata.concat(this.model.get('user'),endTabledata);
			var unit = startTabledata.concat(this.model.get('unit'),endTabledata);
			var serialNumber = startTabledata.concat(this.model.get('serial_number'),endTabledata);
			var comment = startTabledata.concat(this.model.get('comment'),endTabledata);
			
			this.$('.usertable').append(startTablerow.concat(user,unit,serialNumber,comment,endTablerow));
			*/
			
			
			var columns = [
			               {'title': 'User'},
			               {'title': 'Unit'},
			               {'title': 'Serial Number'},
			               {'title': 'Comment'}
			               ];
			var tableData = {'data': this.model.get('data'), 'columns': columns};
			this.$('.usertable').dataTable(tableData);
			
			
		},
		
	});
});
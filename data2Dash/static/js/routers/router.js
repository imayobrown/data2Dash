define(['underscore', 'backbone', 'data-graph', 'user-table','datatables','s2p-input-form'],
		function(_, Backbone, DataGraph, UserTable, DataTable, s2pInputForm) {

	return Backbone.Router.extend({

		routes: {
			's2p': 's2p',
			'graph(/:id)': 'graph',
			'table': 'table',
			'*defaults': 'routeDefault',
		},
		
		initialize: function(options) {
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
			this.listenTo(Backbone,'all',this.globalEventHandler);
		},
		
		globalEventHandler: function(event, data) {
			if(this[event]) this[event](data);
		},
		
		graph: function(id) {
			var graph;
			var graphString = 'graph';
			
			if(!$('body > .application > .data-graph').length) {
				Backbone.trigger('global:app-view:close');
				graph = new DataGraph();
				$('body > .application').append(graph.render());
			}
			
			Backbone.trigger('data-graph:retrieve-data', id);
			Backbone.history.navigate(graphString.concat('/',id));
		},
		
		table: function() {
			//user = typeof user !== 'undefined' ? user : ""; //This line sets a default value for user if one is not supplied.
			var table;
			if (!$('.table-wrapper').length){
				Backbone.trigger('global:app-view:close');
				table = new UserTable();
				$('body > .application').append(table.render());
				Backbone.trigger('user-table:retrieve-data');
			}
			
			Backbone.history.navigate('table');
		},
		
		s2p: function() {
			
			if (!$('.s2p-input-form').length){
				Backbone.trigger('global:app-view:close');
				inputForm = new s2pInputForm();
				$('body > .application').append(inputForm.render());
			}
			
			Backbone.history.navigate('s2p');
		},
		
		routeDefault: function() {
		}
	});
});
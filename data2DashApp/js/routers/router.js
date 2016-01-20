define(['underscore', 'backbone', 'home', 'data-view', 'data-input', 'data-graph', 'data-table', 'line-graph'],
		function(_, Backbone, Home, DataView, DataInput, DataGraphView, DataTableView, LineGraph) {

	return Backbone.Router.extend({

		routes: {
			'view-data': 'view-data',
			'view-data/datagraph/:id': 'view-data-graph',
			'input-data': 'input-data',
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
		
		//Loads in the view to inspect data
		'view-data': function() {
			if (!this.view.returnType) {
				this.loadView(new DataView);
			}
			this.view.loadTable();
		},
		
		'view-data-graph': function(id) {
			if (!this.view.returnType) {
				this.loadView(new DataView());
			}
			this.view.dataGraphView.setModelID(id);
			this.view.loadGraph();
		},
		
		'input-data': function() {
			this.loadView(new DataInput);
		},
		
		//Default view loaded if url is not recognized
		routeDefault: function() {
			var home = new Home();
			this.loadView(home);
			this.navigate('');
		},
		
		//Removes current view and loads passed view into DOM
		loadView: function(view) {
			if (this.view && this.view.close) {
				this.view.close();
			}
			else if(this.view){
				this.view.remove();
			}
			this.view = view;
			$('#application-container').append(this.view.render().el);
		}
	});
});
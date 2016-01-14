define(['underscore', 'backbone', 'home', 'data-view', 'data-input'],
		function(_, Backbone, Home, DataView, DataInput) {

	return Backbone.Router.extend({

		routes: {
			'view-data': 'view-data',
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
			this.loadView(new DataView());
			this.navigate('view-data');
		},
		
		'input-data': function() {
			this.loadView(new DataInput);
			this.navigate('input-data');
		},
		
		//Default view loaded if url is not recognized
		routeDefault: function() {
			this.loadView(new Home());
			this.navigate('');
		},
		
		//Removes current view and loads passed view into DOM
		loadView: function(view) {
			if (this.view) {
				this.view.remove();
			}
			this.view = view;
			$('.application').append(this.view.render().el);
		}
	});
});
define([], function() {
	
	return {
		
		start: function() {

			// Perform some basic tests to make sure template is set up properly.
			require(['bootstrap', 'collections/collection.ini', 'models/model.ini', 'routers/router.ini', 'views/view.ini']
					, function(Bootstrap, Collection, Model, Router, View) {
				
				var collection, model, router, view;
				
				collection = new Collection(
					[{attr11: 'attr11', attr12: 'attr12', attr13: 'attr13'}, {attr21: 'attr21', attr22: 'attr22', attr23: 'attr23'}],
					{prop1: 'prop1', prop2: 'prop2', prop3: 'prop3', model: Model}
				);
				
				model = new Model(
					{attr1: 'attr1', attr2: 'attr2', attr3: 'attr3'}, 
					{prop1: 'prop1', prop2: 'prop2', prop3: 'prop3'}
				);
				
				router = new Router({prop1: 'prop1', prop2: 'prop2', prop3: 'prop3'});
				view = new View({prop1: 'prop1', prop2: 'prop2', prop3: 'prop3'});
				
				console.log('Printing raw objects...');
				console.log('Initial collection: ', collection);
				console.log('Initial model: ', model);
				console.log('Initial router: ', router);
				console.log('Initial view: ', view);
				console.log('');
				console.log('Printing collection and model JSON...');
				console.log('Initial collection toJSON: ', collection.toJSON());
				console.log('Initial model toJSON', model.toJSON());
				console.log('');
				console.log('Testing view close method...');
				view.close();
				console.log('');
				console.log('Tests complete!');
			});

		}
	};
});

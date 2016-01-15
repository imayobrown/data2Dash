define(['underscore', 'jquery', 'backbone', 'data-set', 'text!templates/data-input.html'], function(_, $, Backbone, DataSet, Template) {
	
	var dataInput = Backbone.View.extend({
		
		id: 'data-input-form',
		
		initialize: function(options) {
			
			//Add any key value pairs from options to object hash
			_.each(options, function(value, key) {
				this[key] = value;
			}, this);
			
		},
		
		events: {
			'click #submit-button': 'submit-data',
		},
		
		template: _.template(Template),
		
		render: function() {
			//Set html for view to be rendered template
			this.$el.html(this.template());
			
			//Return view so actions on it can be chained from render
			return this;
		},
		
		'submit-data': function() {
			
			//Create new model to save data collected from form
			var localModel = new DataSet();
			
			//Load data from view into model
			localModel.set({'user': $('#user').val()});
			localModel.set({'comment': $('#comment').val()});
			
			var file = $('#data-file:file')[0].files[0]; //Get file property from jquery object
			localModel.set({'dataType': file.name.split('.')[file.name.split('.').length - 1]}); //Extract data type from file name
			
			var reader = new FileReader(); //Create FileReader object
			
			//Bind event handler to fire when FileReader load event is fired
			reader.onload = function() {
				localModel.set({'data': reader.result}); //Load text from file reader into model as data
				
				//Wait till data has been set on model to save
				var jqXHR = localModel.save();
				console.log(jqXHR);
				console.log(localModel.attributes.toString());
			};
			
			//Start reading data from file as text
			reader.readAsText(file);
			
			
		},
		
	});
	
	return dataInput;
	
});
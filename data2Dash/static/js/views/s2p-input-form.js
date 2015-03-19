define(['jquery','underscore','backbone',
        'text!templates/s2p-input-form.html'],
        function($,_,Backbone,Template){
	
	return Backbone.View.extend({
		
		className: "container-fluid row app-view s2p-input-form",
		
		template: _.template(Template),
		
		events: {
			'click #submit-button': 's2p-input-form:data-submit',
		},
		
		's2p-contents': '',
		
		render: function(){
			this.$el.html(this.template());
			
			return this.$el;
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
		
		's2p-input-form:data-submit': function() {
			var csrftoken = $('meta[name="csrf-token"]').attr('content');
			var user = $('#user').val();
			var unit = $('#unit').val();
			var serialNumber = $('#serial-number').val();
			var comment = $('#comment').val();
			
			var formData = new FormData();
			formData.append('user',user);
			formData.append('unit',unit);
			formData.append('serialNumber',serialNumber);
			formData.append('comment',comment);
			
			var file = document.getElementById('s2p-file').files[0];
			var reader = new FileReader();
			
			reader.onload = function() {
				var s2pContents = reader.result;
				formData.append('s2pFile',s2pContents);
				
				$.ajax({
					beforeSend: function(xhr){
						xhr.setRequestHeader('X-CSRFToken', csrftoken);
					},
					url: '/adds2p/',
					type:'POST',
					data: formData,
					processData: false,
					contentType: false,
					success: function(text){
						alert('ajax POST successful: '+text);
					},
					error: function(){
						alert('Error on ajax POST');
					}
				});
			}
			reader.readAsText(file);

		},
		
		'global:app-view:close': function(){
			this.remove();
		}
	});
});
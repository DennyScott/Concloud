var sf = new SmartFile({});


Template.projectPage.events({
	/**
	 * This will mimic an actual update to the current project
	 * @param  Meteor.call('updateProject', this._id, function (error, result) {		});	}} [description]
	 * @return {[type]}   [description]
	 */
	'click #update-btn': function () {
		Meteor.call('updateProject', this._id, function (error, result) {
		});
	},

	'click #smartfile': function (e, template) {
		e.preventDefault();
		var file = template.find('#upload').files[0];
		sf.upload(file,

			function (err, res){
				if (err) {
					console.log("upload failed", err);
					return;
				}

			//Successful Upload
			
			var folderCreation = {
				createdByAuthorID : Meteor.user()._id,
				createdByAuthorName : Meteor.user().profile.name,
				createdDate : new Date()

			};

			var folderUpdate = {
				updateDate : new Date(),
				updateAuthorID : Meteor.user()._id,
				updateAuthorName : Meteor.user().profile.name
			};

			var fileCreation = {
				createdByAuthorID: Meteor.user()._id,
				createdByAuthorName: Meteor.user().profile.name,
				createdDate: new Date()
			};

			var fileData = {
				name: file.name,
				size: file.size,
				fileCreation: fileCreation
			};

			var folderData = {
				folderCreation : folderCreation,
				file : fileData,
				folderUpdate : folderUpdate
			};

			var myProject = Projects.findOne({_id: Session.get("currentProject")});
			myProject.folders = folderData;
			
			
		});
	},

	'click #downloadMe' : function(e, template){
		e.preventDefault();
		console.log('here');
		Meteor.call('downloadFile', "bench.jpg", window,
			function(err, result){
				if(err)
					console.log(err);
				window.location.href = result;
				
			});


	}
});

Template.projectPage.helpers({
	
	listSmartFiles : function() {
		Meteor.call('getSmartFiles', function(err, response){
			console.log(response);
		});
	}
});
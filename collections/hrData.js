HRData = new Meteor.Collection('hrData');

Meteor.methods({
	HRField: function (newEntry) {
		if(!HRData.findOne({fieldName: newEntry.fieldName})){
			var user = Meteor.user();
			var entry = _.extend(_.pick(newEntry, 'fieldName', 'defaultValue'), {
				createdOn: new Date().getTime(),
				createdBy: user._id
			});

			var projectID = HRData.insert(entry);

			hrFound = HR.find({});
			var insertObject = {};
			insertObject[entry.fieldName] = entry.defaultValue;
			hrFound.forEach(function (post) {
				HR.update({userId: post.userId}, {$set: insertObject});
			});

			return projectID;
		} else {
			throw new Meteor.Error(403, "This Field already exists");
		}
	},

	HRFieldUpdate: function (newEntry) {
			var user = Meteor.user();
			var entry = _.extend(_.pick(newEntry, 'fieldName', 'defaultValue'), {
			createdOn: new Date().getTime(),
			createdBy: user._id
		});

		var entryID = HRData.update({"_id" : newEntry._id}, newEntry);

		return entryID;
	},

	HRFieldRemove: function (deleteEntry) {
		var fieldName = deleteEntry.fieldName;
		HRData.remove({"_id" : deleteEntry._id});

		hrFound = HR.find({});
		hrFound.forEach(function (post) {
			console.log(post);
			delete post['fieldName']; //LAST EDITING HERE
			HR.update({userId: post.userId}, post);
		});
	}
});
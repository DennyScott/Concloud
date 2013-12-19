Projects = new Meteor.Collection('projects');

Meteor.methods({
	/**
	 * This function will data validate the new project being passed
	 * and then if no errors occur, place this new project in
	 * the Project collection
	 * @param  {[object]} projectAttributes [A prelimeanry project object, containg the title, description, and url]
	 * @return {[string]}                   [A String of its ID in the collection]
	 */
	project: function(projectAttributes){
		var user = Meteor.user();

		//Ensures that the user is logged in
		if (!user){
			throw new Meteor.Error(401, "You need to log in to create new projects");
		}

		if(!projectAttributes.title){
			throw new Meteor.Error(422, 'Error 422: Project must have a title');
		}

		//filling in other keys
		var proj = _.extend(_.pick(projectAttributes, 'title', 'description'), {
			authorID: user._id,
			authorName: user.profile.name,
			submitted: new Date().getTime(),
			updates: [{
				updateDate: new Date().getTime(),
				updateAuthorName: user.profile.name,
				updateAuthorID: user._id
			}],
			recentUpdate: {
				updateDate: new Date().getTime(),
				updateAuthorName: user.profile.name,
				updateAuthorID: user._id
			}
			//NEED TO FILL IN DATA FOR HOLDING ACTUAL DOCUMENTS!!
		});

		//Inserts new project into collection
		var projectID = Projects.insert(proj);

		//returns the ID of the new project
		return projectID;
	},

	/**
	 * This function will update the project passed to
	 * have a new update Author and update Time
	 * @param  String id The id of the project to be updated
	 * @return void    Returns nothing
	 */
	updateProject: function(id){
		var user = Meteor.user();

		var project = Projects.findOne(id);
		Meteor.users.update({_id: Meteor.userId()}, {$set : {'profile.recent.lastProjectID' : id, 'profile.recent.lastProjectName' : project.title } });
		var update = {
				updateDate: new Date().getTime(),
				updateAuthorName: user.profile.name,
				updateAuthorID: user._id
			};

		Projects.update(id, {$addToSet: {updates: update}});
		Projects.update(id, {$set : {recentUpdate: update}});
		createProjectNotification(project);
	}
});
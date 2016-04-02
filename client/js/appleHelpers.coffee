if Meteor.isClient
	window.updateSess = (data, accessor) ->
		curr = Session.get 'userSessItem'
		if !curr then curr = new Object()
		curr[accessor] = data

		Session.setPersistent('userSessItem', curr)
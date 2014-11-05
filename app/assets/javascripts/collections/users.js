Qutria.Collections.Users = Backbone.Collection.extend({
  model: Qutria.Models.User
  , url: "/api/users"
  , parse: function (resp) {
    this.max_pages = resp['pages'];
    delete resp['pages']
    return resp['users']
  }
})

Qutria.Views.Answer = Qutria.Views.Composite.extend({
  initialize: function () {
    this.listenTo(this.model, "sync change destroy", this.render);
  }
  , template: JST['answer']
  , events: {
    "click button.edit-answer" : "updateAnswer"
    , "click a.delete-answer" : "deleteAnswer"
  }
  , updateAnswer: function (event) {
    event.preventDefault();
    var data = this.$(".edit-answer").serializeJSON();
    this.model.save(data, {
      success: function () {
      }
    })
  }
  , deleteAnswer: function (event) {
    event.preventDefault();
    var self = this;
    this.model.destroy({
      success: function () {
        self.remove()
      }
    })
  }
  , render: function () {
    var self = this;
    this.$el.html(this.template({ answer: this.model }));
    if(this.model.comments) {
      this.model.comments.each(function (comment) {
        var view = new Qutria.Views.Comment({ model: comment })
        self.add_subview("div.answer-comments", view)
      })
    }
    if (this.model.user) {
        var view = new Qutria.Views.Author({ model: this.model.user })
        self.add_subview("div.answer-author", view)
    }
    return this;
  }
});

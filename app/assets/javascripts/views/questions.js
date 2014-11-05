Qutria.Views.Questions = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync add remove reset", this.render);
    this.listenTo(Qutria.currentUser, "change", this.render);
    Qutria.current_page = 1;
    $(window).scroll(this.scrolling.bind(this));
    this.collection.fetch({
      data: { page: Qutria.current_page }
    });
  }
  , template: JST['questions_index']
  , events: {
      "click #new-question" : "questionCreate"
  }
  , questionCreate: function (event) {
    event.preventDefault();
    var self = this;
    var form = $('#new-question-form').serializeJSON();
    var newQuestion = new Qutria.Models.Question(form);
    newQuestion.set("user", Qutria.currentUser);
    newQuestion.save({}, {
      success: function () {
        self.collection.add(newQuestion)
      }
      , error: function () {
      }
    })
  }
  , scrolling: function (event) {
    // If we almost scroll to bottom
    if ($(window).scrollTop() >= Qutria.scroll_trigger * .7 ) {
      if (Qutria.current_page <= this.collection.max_pages) {
        this.collection.fetch({
          remove: false
          , data: { page: Qutria.current_page + 1}
          , success: function (resp) {
            Qutria.current_page += 1;
            console.log(Qutria.current_page)
          }
        });
      }
    }
  }
  , render: function () {
    this.$el.html(this.template({ questions: this.collection }));
    Qutria.scroll_trigger = $(document).height() - $(window).height()
    return this;
  }
})

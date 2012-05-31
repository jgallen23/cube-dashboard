var EventList = function(el, events, options) {
  this.el = d3.select(el);

  this.events = events;
  this.options = aug(true, {}, EventList.defaults, options);
  this.render();
};


EventList.defaults = {
  selected: function() {}
};


EventList.prototype.render = function() {
  var self = this;
  var addListItem = function(name, data) {
    self.el
      .append('li')
        .text(name)
        .on('click', function() {
          self.options.selected(name, data);
        });
  };
  for (var name in this.events) {
    addListItem(name, this.events[name]);
  }
};

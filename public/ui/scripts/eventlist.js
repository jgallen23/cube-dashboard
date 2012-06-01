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
  var addListItem = function(name, value) {
    self.el
      .append('option')
        .text(name)
        .attr('value', value);
  };
  addListItem("Please select", "-1");
  for (var name in this.events) {
    addListItem(name, name);
  }
  self.el.on('change', function() {
    if (this.value == "-1")
      return;
    self.options.selected(this.value, self.events[this.value]);
  });
};

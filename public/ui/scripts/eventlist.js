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
  for (var name in this.events) {
    addListItem(name, name);
  }
  self.el.on('change', function() {
    self.options.selected(this.value, self.events[this.value]);
  });
  var firstKey = Object.keys(this.events)[0];
  self.options.selected(firstKey, self.events[firstKey]);
};

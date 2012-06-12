var Events = function(el, host, name, dataPoints) {
  this.el = d3.select(el);
  this.host = host;
  this.name = name;
  this.dataPoints = dataPoints;

  this.render();
};

Events.prototype.render = function() {
  var self = this;
  var expression = (this.dataPoints.length == 0) ? this.name : this.name+'('+this.dataPoints.join(',')+')';
  var url = this.host+'/1.0/event?expression='+expression+'&limit=100&cachebuster='+ (+new Date());

  var writeHeader = function() {
    var row = self.el
      .append('tr');

    row.append('th')
        .attr('class', 'time')
        .text('Time');
    for (var i = 0, c = self.dataPoints.length; i < c; i++) {
      var dp = self.dataPoints[i];
      row
        .append('th')
          .text(dp);
    }

  };

  var addRow = function(data) {

    var row = self.el.append('tr');

    row.append('td').text(new Date(data.time).toRelativeTime());
    for (var i = 0, c = self.dataPoints.length; i < c; i++) {
      var cell = data.data[self.dataPoints[i]];
      if (typeof(cell) == "object") { cell = JSON.stringify(cell); }
      row
        .append('td')
          .text(cell);
    }


  };
  d3.json(url, function(json) {
    self.el
      .text('');
    writeHeader();
    for (var i = json.length - 1, c = 0; i >= c; i--) {
      var data = json[i];
      addRow(data);
    }
  });
};


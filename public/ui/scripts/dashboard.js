var Dashboard = function(elementSelector, host, options) {
  this.selector = elementSelector;
  this.host = host;
  this.options = aug(true, {}, Dashboard.defaults, options);
  this.setup();
  if (options.metrics) {
    this.setMetrics(options.metrics);
  }
};

Dashboard.defaults = {
  host: '',
  showTotals: false,
  height: 35
};

Dashboard.prototype.setup = function() {
  var step = +cubism.option("step", 1e4);
  var context = cubism.context()
      .step(step)
      .size(window.innerWidth - 4);

  //$("window").resize(function() {
    //window.location.reload();
  //});;

  this.cube = context.cube(this.host);
  this.horizon = context.horizon();

  // Add top and bottom axes to display the time.
  d3.select(this.selector).selectAll(".axis")
      .data(["top", "bottom"])
    .enter().append("div")
      .attr("class", function(d) { return d + " axis"; })
      .each(function(d) { d3.select(this).call(context.axis().ticks(12).orient(d)); });

  // Add a mouseover rule.
  d3.select(this.selector)
    .append("div")
      .attr("class", "rule")
      .call(context.rule());

  //

  // On mousemove, reposition the chart values to match the rule.
  context.on("focus", function(i) {
    d3.selectAll(".value").style("right", i == null ? null : context.size() - i + 5 + "px");
  });

  d3.selectAll("#step option").property("selected", function() {
    return this.value == step;
  });

  d3.select("#step").on("change", function() {
    window.location = "?step=" + this.value + "&" + location.search.replace(/[?&]step=[^&]*(&|$)/g, "$1").substring(1);
  });
};

Dashboard.prototype.fetchTotals = function() {
  var self = this;

  var getTotal = function(index, expression, start, stop) {
    var format = d3.time.format.iso;
    var url = self.host+'/1.0/metric?expression='+expression+'&start='+format(start)+'&stop='+format(stop)+'&step=3600000&cachebuster='+ (+new Date());
    d3.json(url, function(response) {
      var val = 0;
      for (var i = 0, c = response.length; i < c; i++) {
        var res = response[i];
        val += res.value;
      }
      var el = d3.selectAll('.horizon .title .totals')[0][index];
      el.innerHTML = val;
    });
  };

  var start = d3.time.day.floor(new Date());
  var stop = d3.time.day.offset(start, 1);

  for (var i = 0, c = self.metrics.length; i < c; i++) {
    var metric = self.metrics[i];
    var expression = metric.expression.toString();
    getTotal(i, expression, start, stop);
  }

  setTimeout(function() { self.fetchTotals (); }, 60*1000);
};

Dashboard.prototype.setMetrics = function(metrics) {
  var self = this;
  this.metrics = metrics;
  d3.select(this.selector)
    .insert("div", ".bottom")
    .selectAll(".horizon")
      .data(metrics)
    .enter().append("div")
      .attr("class", "horizon")
    .call(self.horizon
      .height(self.options.height)
      .title(function(d) { return d.title; })
      .metric(function(d) { return self.cube.metric(d.expression); }));

   if (this.options.showTotals) {
     d3.selectAll('.horizon .title').append('span').attr('class', 'totals');
     this.fetchTotals();
   }
};

var DashboardSelect = function(selector, dashboards) {
  this.selector = selector;
  this.dashboards = dashboards;
  
  this.currentIndex = cubism.option("dashboard", 0);
  this.setup();
};

DashboardSelect.prototype.setup = function() {

  var select = d3.select(this.selector)[0][0]; 
  for (var i = 0, c = this.dashboards.length; i < c; i++) {
    var dashboard = this.dashboards[i];

    var option = document.createElement('option');
    option.setAttribute('value', i);
    option.innerHTML = dashboard.name;
    select.appendChild(option);
  }
  select.selectedIndex = this.currentIndex;
  select.addEventListener('change', function() {
    window.location = "?dashboard=" + select.value + "&" + location.search.replace(/[?&]dashboard=[^&]*(&|$)/g, "$1").substring(1);
  });

  document.title = this.getCurrentDashboard().name + ' Dashboard';

};

DashboardSelect.prototype.getCurrentDashboard = function() {
  return this.dashboards[this.currentIndex];
};

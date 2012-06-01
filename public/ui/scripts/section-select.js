var SectionSelect = function(el) {
  d3.select(el)
    .on('change', function() {
      window.location = '/'+this.value+'.html';
    });
};

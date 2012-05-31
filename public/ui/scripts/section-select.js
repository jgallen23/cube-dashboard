var SectionSelect = function(el) {
  d3.select(el)
    .on('change', function() {
      console.log(this.value);
      window.location = '/'+this.value+'.html';
    });
};

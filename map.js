$("path").hover(function(e) {
  $('#info-box').html($(this).data('info'));
  console.log("yes");
});
// $("path").mouseleave(function(e) {
//   $('#info-box').css('display','none');
// });
// $(document).mousemove(function(e) {
//   $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
//   $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
// }).mouseover();
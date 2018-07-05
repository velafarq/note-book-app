
$("#practice-sessions").on('click', function() {
    getCategory('Practice Sessions');
  });
  $("#lessons").on('click', function() {
    getCategory('Lessons');
  });
  $("#performances").on('click', function() {
    getCategory('Performances');
  });
  $("#master-classes").on('click', function() {
    getCategory('Master Classes');
  });
  $("#other").on('click', function() {
    getCategory('Other');
  });
  

$('#logout').click(IS_LOGGED_IN ? logout : goToLoginPage);
$("#login").click(goToLoginPage);
$("#register").click(goToRegisterPage());
  
//   $('.main__block__post-summary__view-more').click(goToEntry);
$(".nav__list__add-entry").click(goToNewEntry);

  //dropdown menu in nav



  $(".home").on('click', function() {
    IS_LOGGED_IN ? getData(displayRecentPosts) : goToLoginPage();
    
});


$body.html(IS_LOGGED_IN ? loggedInView : goToLoginPage);

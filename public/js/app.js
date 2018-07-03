
$practice.on('click', function() {
    getCategory('Practice Sessions');
  });
  $lessons.on('click', function() {
    getCategory('Lessons');
  });
 $performances.on('click', function() {
    getCategory('Performances');
  });
$masterClass.on('click', function() {
    getCategory('Master Classes');
  });
$other.on('click', function() {
    getCategory('Other');
  });
  
//   $logout.text(IS_LOGGED_IN ? 'LOGOUT' : 'LOGIN');
  $logout.click(IS_LOGGED_IN ? logout : goToLoginPage);
  $login.click(goToLoginPage);
  $register.click(goToRegisterPage());
  
//   $('.main__block__post-summary__view-more').click(goToEntry);
  $newEntry.click(goToNewEntry);

  //dropdown menu in nav


$body.html(IS_LOGGED_IN ? loggedInView : goToLoginPage);

$home.on('click', function() {
    IS_LOGGED_IN ? getData(displayRecentPosts) : goToLoginPage();
    
});

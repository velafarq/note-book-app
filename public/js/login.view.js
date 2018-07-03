const goToLoginPage = () => {
  $('.body').empty();
    $('.body').append(login_template);
    $("#login-user").submit(login);
    $("#register").click(goToRegisterPage);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    goToLoginPage();
  };

  const goToRegisterPage = () => {
    $('.body').empty();
    $('.body').append(register_template);
   $("#register-new-user").submit(register);
    $("#login").click(IS_LOGGED_IN ? logout : goToLoginPage);
  };

  const loggedInView = () => {
    $('.body').empty();
    $('.body').append(logged_in_template);
    $("#nav-categories").click(function() {
      $("#categories-dropdown").toggleClass('show');
    });
    
    // window.onclick = function(e) {
    //   if (!e.target.matches($categories)) {
    //     if ($($categoryDropDown).hasClass('show')) {
    //       $($categoryDropDown).removeClass('show');
    //     }
    //   }
    // };
    $(".nav__list__add-entry").click(goToNewEntry);
   

    $(".home").on('click', function() {
      IS_LOGGED_IN ? getData(displayRecentPosts) : goToLoginPage();
    });

    $('#logout').click(IS_LOGGED_IN ? logout : goToLoginPage);

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
      

    
  }
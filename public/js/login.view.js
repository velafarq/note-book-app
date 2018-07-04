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

  //nav bar  
  
    $(".nav__add-entry").click(goToNewEntry);

    $(".home").on('click', function() {
       getData(displayRecentPosts)
    });

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
      $('#logout').click(logout);
  }
  

  
const goToLoginPage = () => {
    $body.empty();
    $body.append(login_template);
    $loginForm.submit(login);
    $("#register").click(goToRegisterPage);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    goToLoginPage();
  };

  const goToRegisterPage = () => {
    $body.empty();
    $body.append(register_template);
    $registerForm.submit(register);
    $login.click(IS_LOGGED_IN ? logout : goToLoginPage);
  };

  const loggedInView = () => {
    $body.empty();
    $body.append(logged_in_template);
    $categories.click(function() {
      $categoryDropDown.toggleClass('show');
    });
    
    // window.onclick = function(e) {
    //   if (!e.target.matches($categories)) {
    //     if ($($categoryDropDown).hasClass('show')) {
    //       $($categoryDropDown).removeClass('show');
    //     }
    //   }
    // };
    $newEntry.click(goToNewEntry);
   

    $home.on('click', function() {
      IS_LOGGED_IN ? getData(displayRecentPosts) : goToLoginPage();
    });

      $logout.click(IS_LOGGED_IN ? logout : goToLoginPage);

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
      

    
  }
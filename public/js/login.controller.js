const login = e => {
    e.preventDefault();
    
  
    const email = $("#login-user").find('#user-email').val();
    const password = $("#login-user").find('#user-password').val();
    const data = JSON.stringify({
      email,
      password,
    });
    
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: data,
      headers: {
      "Content-Type": "application/json",
      },
    })
    .then(res => {
      if (!res.ok) {
        throw res;
        return;
      }
      return res.json();
    })
    .then(data => {
      localStorage.setItem('token', data.token);
      loggedInView();
      getData(displayRecentPosts);
    })
    .catch(error => {
      $('.main__login').append(`
          <p class="failed-login">Oops, your login was not successful!</p>
         `);
      setTimeout(() => {
        $('.main__login .failed-login').hide();
      }, 3000);
    });
};
  
  const register = e => {
    e.preventDefault();
  
    const email = $("#register-new-user").find('#user-email').val();
    const password = $("#register-new-user").find('#user-password').val();
    const data = JSON.stringify({
      email,
      password,
    });
  
    
    fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (!res.ok) {
        throw res;
        return;
      }
      return res.json();
    })
      .then(data => {
      
        localStorage.setItem('token', data.token);
       loggedInView();
        $(".main__block").html(`Welcome!`)
        
      })
      .catch(error => {
        $('.main__login').append(`
          <p class="failed-login">Oops, your register was not successful! Please try a different email.</p>
         `);
      setTimeout(() => {
        $('.main__login .failed-login').hide();
      }, 3000);
      });
  };
  

  
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
      .then(res => res.json())
      .then(data => {
        
        localStorage.setItem('token', data.token);

      })
      .catch(error => {
        $(".main__block").empty();
        $(".main__block").append(`
          <p>Oops, your login was not successful!</p>
         `);
      });
      getData(displayRecentPosts);
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
      .then(res => res.json())
      .then(data => {
      
        localStorage.setItem('token', data.token);
        $(".main__block").empty();
        $(".main__block").html(`Welcome! Click <a href="#" onlick="goToNewEntry()">here</a>to begin a new post.`)
        
      })
      .catch(error => {
        $(".main__block").empty();
        $(".main__block").append(`
          <p>Oops, your register was not successful!</p>
       `);
      });
  };
  

  
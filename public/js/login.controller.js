const login = e => {
    e.preventDefault();
  
    const email = $("#login-user").find('#user-email').val();
    const password = $("#login-user").find('#user-password').val();
    const data = JSON.stringify({
      email,
      password,
    });
    
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      body: data,
      headers: {
      "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        
        localStorage.setItem('token', data.token);
        $(".main__block").empty();
        getData(displayRecentPosts);
      })
      .catch(error => {
        $(".main__block").empty();
        $(".main__block").append(`
          <p>Oops, your login was not successful!</p>
         `);
      });
  };
  
  const register = e => {
    e.preventDefault();
  
    const email = $("#register-new-user").find('#user-email').val();
    const password = $("#register-new-user").find('#user-password').val();
    const data = new FormData();
  
    data.append('json', JSON.stringify({ "email": email, "password": password }));
      
    fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: data,
        
    })
      .then(res => res.json())
      .then(userInfo => {
      
        console.log(userInfo);
        localStorage.setItem('token', userInfo.token);
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
  

  
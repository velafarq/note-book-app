const login = e => {
    e.preventDefault();
  
    const email = $("#login-user").find('#user-email').val();
    const password = $("#login-user").find('#user-password').val();
    const data = new FormData();
  
    data.append('json', JSON.stringify({ email: email, password: password }));
  
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: data,
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
  
    const email = $('#user-email').val();
    const password = $('#user-password').val();
    const data = new FormData();
  
    data.append('json', JSON.stringify({ email: email, password: password }));
  
    fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        $(".main__block").empty();
        $(".main__block").html(`Welcome! Click <a href="#" onlick="goToNewEntry()">here</a>to begin a new post.`)
        // getData(`${BASE_URL}/posts`, displayRecentPosts);
      })
      .catch(error => {
        $(".main__block").empty();
        $(".main__block").append(`
          <p>Oops, your register was not successful!</p>
       `);
      });
  };
  

  
const login_view = `<header class="header">
        <h1 class="header__title">Note <i class="fas fa-music"></i> Book</h1>
        <p class="header_subtitle">A Musician's Journal</p> 
    </header>
<main class="main__login"> 
    <section class=login-box>
        <form action="" class= "login-box__form" id="login-user" role="form" method="post">
                <h2>Login</h2>
                <label for="email">Email</label>
                <input type="email" placeholder="my@email.com" name="user-email" id="user-email" required/>
                <label for="password">Password</label>
                <input type="password" placeholder="mySafePassword12!" name="user-password" id="user-password" required/>
                <button type="submit" class="button__login">Login</button>     
        </form>
        <footer role="contentinfo" class="footer">
                <p>Still need to create an account? <a href="#" id="register">Register</a></p>
              </footer>
    </section>
</main>`

const register_view = `<header class="header">
<h1 class="header__title">Note <i class="fas fa-music"></i> Book</h1>
<p class="header_subtitle">A Musician's Journal</p> 
</header>
<main class="main__login"> 
<section class=login-box>
<form action="" class= "login-box__form" id="register-new-user" role="form" method="post">
        <h2>Register</h2>
        <label for="email">Email</label>
        <input type="email" placeholder="my@email.com" name="user-email" id="user-email" required/>
        <label for="password">Password</label>
        <input type="password" placeholder="mySafePassword12!" name="user-password" id="user-password" required/>
        <button type="submit" class="button__login">Register</button>     
</form>
<footer role="contentinfo" class="footer">
        <p>Already have an account? <a id="login">Login</a></p>
      </footer>
</section>
</main>`



const registerNewUser= e => {
    e.preventDefault();
  
    const email = $('#user-email').val();
    const password = $('#user-password').val();
   
  
    const data = new FormData();
    data.append('json', JSON.stringify({ email: email, password: password}));
  
    fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        $(".left-block").empty();
  
        getData('http://localhost:8080/posts', displayRecentPosts);

      })
      .catch(error => {
        $(".left-block").empty();
  
      $('.left-block').append(`
      <p>Oops, your register was not successful!</p>
     `);
        console.log(error);
      });
  };
  
  const loginUser= e => {
    e.preventDefault();
  
    const email = $('#user-email').val();
    const password = $('#user-password').val();
   
  
    const data = new FormData();
    data.append('json', JSON.stringify({ email: email, password: password}));
  
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        $(".left-block").empty();
  
        getData('http://localhost:8080/posts', displayRecentPosts);

      })
      .catch(error => {
        $(".left-block").empty();
  
      $('.left-block').append(`
      <p>Oops, your login was not successful!</p>
     `);
        console.log(error);
      });
  };
  
  

const goToLoginPage = () => {
    $('.body').empty();
    $('.body').append(login_view);
    $("login-user").submit(loginUser);
    $("#register").click(goToRegisterPage);
}

const goToRegisterPage = () => {
    $(".body").empty();
    $(".body").append(register_view);
    $("#register-new-user").submit(registerNewUser);
    $("#login").click(goToLoginPage);
}

$("#login").click(goToLoginPage);
$("#register").click(goToRegisterPage);
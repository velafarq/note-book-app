const login_view = `<header class="header__login">
        <h1 class="header__login__title">Note <i class="fas fa-music"></i> Book</h1>
        <p class="header_subtitle">A Musician's Journal</p> 
    </header>
<main class="main__login"> 
    <section class=login-box>
        <form action="" class= "login-box__form" role="form" method="post">
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

const register_view = `<header class="header__login">
<h1 class="header__login__title">Note <i class="fas fa-music"></i> Book</h1>
<p class="header_subtitle">A Musician's Journal</p> 
</header>
<main class="main__login"> 
<section class=login-box>
<form action="" class= "login-box__form" role="form" method="post">
        <h2>Register</h2>
        <label for="email">Email</label>
        <input type="email" placeholder="my@email.com" name="user-email" id="user-email" required/>
        <label for="password">Password</label>
        <input type="password" placeholder="mySafePassword12!" name="user-password" id="user-password" required/>
        <button type="submit" class="button__login">Login</button>     
</form>
<footer role="contentinfo" class="footer">
        <p>Already have an account? <a id="login">Login</a></p>
      </footer>
</section>
</main>`



const goToLoginPage = () => {
    $('.body').empty();
    $('.body').append(login_view);
}

const goToRegisterPage = () => {
    $('.body').empty();
    $('.body').append(register_view);
}



$("#login").click(goToLoginPage);
$("#register").click(goToRegisterPage);


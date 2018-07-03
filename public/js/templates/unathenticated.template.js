const login_template = $(`
<header class="header">
            <section class="header__container">
                <div class="header__container__title">
                    <h1 class="header__title">Note <i class="fas fa-music"></i> Book</h1>
                    <p class="header__subtitle">A Musician's Journal</p> 
                </div>
            </section>
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
                <p>Or <a href="#" id="register">Register</a></p>
              </footer>
    </section>
</main>`);



const register_template = $(`<header class="header">
<section class="header__container">
    <div class="header__container__title">
        <h1 class="header__title">Note <i class="fas fa-music"></i> Book</h1>
        <p class="header__subtitle">A Musician's Journal</p> 
    </div>
</section>
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
        <p>Or <a id="login">Login</a></p>
      </footer>
</section>
</main>`);


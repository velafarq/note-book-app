const logged_in_template = $(`<header class="header">
<section class="header__container">
    <div class="header__container__title home">
        <h1 class="header__title">Note <i class="fas fa-music"></i> Book</h1>
        <p class="header__subtitle">A Musician's Journal</p> 
    </div>
    <nav class="nav">
            <ul class="nav__list">
                <li><a href="#" class="nav__list__add-entry">NEW ENTRY</a></li>
                <li><a href="#" class="home">HOME</a></li>
                <li class="nav__list__categories">
                    <a href="#" class="nav__list__categories__title" id="nav-categories">CATEGORIES <i class="fas fa-sort-down"></i></a>
                    <div class="nav__list__categories__submenu" id="categories-dropdown">
                        <ul>
                            <li><a href="#" id='practice-sessions'>Practice Sessions</a></li>
                            <li><a href="#" id='lessons'>Lessons</a></li>
                            <li><a href="#" id='performances'>Performances</a></li>
                            <li><a href="#" id='master-classes'>Master Classes</a></li>
                            <li><a href="#" id='other'>Other</a></li>
                        </ul>
                    </div>
            </li>
                <li><a href="#" id="logout" onclick="goToLoginPage()">LOGOUT</a></li>
            </ul>
        </nav>  
</section>
</header>
<main class="main">
<section class="main__block">
</section>
</main>`);

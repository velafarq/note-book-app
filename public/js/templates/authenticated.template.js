const logged_in_template = $(`<header class="header">
<section class="header__container">
    <div class="header__container__title home">
        <h1 class="header__title">Note <i class="fas fa-music"></i> Book</h1>
        <p class="header__subtitle">A Musician's Journal</p> 
    </div>
    <nav class="nav">
            
              <a href="#" class="nav__add-entry">NEW ENTRY</a>
             <a href="#" class="home">HOME</a>
                    <div class="nav__categories">
                    <a href="#" class="nav__categories__title" id="nav-categories">CATEGORIES <i class="fas fa-sort-down"></i></a>
                    <div class="nav__categories__submenu">
                        <a href="#" id='practice-sessions'>Practice Sessions</a>
                        <a href="#" id='lessons'>Lessons</a>
                        <a href="#" id='performances'>Performances</a>
                        <a href="#" id='master-classes'>Master Classes</a>
                        <a href="#" id='other'>Other</a>
                    </div>
                    </div>
    
               <a href="#" id="logout">LOGOUT</a>
      
        </nav>  
</section>
</header>
<main class="main">
<div id="results"></div>
<section class="main__block">
</section>
</main>`);

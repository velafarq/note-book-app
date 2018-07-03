const home_page_view = `<header class="header">
<section class="header__container">
    <div class="header__container__title">
        <h1 class="header__title">Note <i class="fas fa-music"></i> Book</h1>
        <p class="header__subtitle">A Musician's Journal</p> 
    </div>
    <nav class="nav">
            <ul class="nav__list">
                <li><a href="#" class="nav__list__add-entry">NEW ENTRY</a></li>
                <li><a href="#" id="home">HOME</a></li>
                <li class="nav__list__categories">
                    <a href="#" class="nav__list__categories__title" id="categories">CATEGORIES <i class="fas fa-sort-down"></i></a>
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
                <li><a href="#" id="login">LOGOUT</a></li>
            </ul>
        </nav>
    
</section>
</header>

<main class="main">

<section class="main__blocks">

<section class="left-block"></section>

</section>

</main>`


function displayRecentPosts(data) {
    $( ".left-block").empty();
    for (index in data) {
       
       $('.left-block').append(
        ` <section class="left-block__post-summary">
        <h3 class="left-block__post-summary__summary-heading">${data[index].title}</h3>
        <p class="left-block__post-summary__info"><span>In: ${data[index].category}</span><span></span></p>
        <p class="left-block__post-summary-snippet">${data[index].content}</p>
        <a class="left-block__post-summary__view-more" onclick="getPostById('${data[index]._id}')">VIEW MORE <i class="fas fa-caret-right"></i></a>
    </section>`);
    }
}

function categoryFilter(data, specificCategory) {
    const categoryData = data.filter(post => post.category === specificCategory);
    $(".left-block").empty();

    for (index in categoryData) {
        $('.left-block').append(` <section class="left-block__post-summary">
        <h3 class="left-block__post-summary__summary-heading">${categoryData[index].title}</h3>
        <p class="left-block__post-summary__info"><span>In: ${categoryData[index].category}</span><span></span></p>
        <p class="left-block__post-summary-snippet">${categoryData[index].content}</p>
        <a class="left-block__post-summary__view-more" onclick="getPostById('${categoryData[index]._id}')">VIEW MORE <i class="fas fa-caret-right"></i></a>
    </section>`)
    }
}



function getData(url, myToken, callback) {
fetch(url, {
    headers: {
        'Authorization':  `bearer ${myToken}`
    }
})
.then(res => res.json())
.then(callback)
}

function getCategory(category) {
    fetch('http://localhost:8080/posts')
    .then(res => res.json())
    .then(data => categoryFilter(data, category))
    .catch(e => console.log(e));
}





// const url = 'http://localhost:8080/posts';

//     getData(url, displayRecentPosts);


    $('#practice-sessions').on('click', function() {
        getCategory('Practice Sessions');
    });
    $('#lessons').on('click', function() {
        getCategory('Lessons');
    });
    $('#performances').on('click', function() {
        getCategory('Performances');
    });
    $('#master-classes').on('click', function() {
        getCategory('Master Classes');
    });
    $('#other').on('click', function() {
        getCategory('Other');
    });

    $('#home').on('click', function() {
        getData(url, displayRecentPosts);
    })
  
    // nav bar drop down menu //

    $( "#categories" ).click(function() {
        $("#categories-dropdown").toggleClass( "show" );
      });
    
      window.onclick = function(e) {
        if (!e.target.matches('#categories')) {
          var myDropdown = document.getElementById("categories-dropdown");
            if ($('#categories-dropdown').hasClass('show')) {
              $('#categories-dropdown').removeClass('show');
            }
        }
      }

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



function getData(url, callback) {
fetch(url)
.then(res => res.json())
.then(callback)
}

function getCategory(category) {
    fetch('http://localhost:8080/posts')
    .then(res => res.json())
    .then(data => categoryFilter(data, category))
    .catch(e => console.log(e));
}





const url = 'http://localhost:8080/posts';

    getData(url, displayRecentPosts);


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
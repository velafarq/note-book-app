
const view_entry = $(`
<h2 class="left-block__entry-heading">Notes on my Senior Recital</h2>
<p class="left-block__entry-body">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
<p class="left-block__entry-category">In Performances</p>
`)

const new_entry = $(`
<form action="" class="left-block__new-entry" id="addPost">
        <p class="left-block__new-entry__category">Choose a category:</p>
        <select name="categories" id="categories" class="left-block__new-entry__category-list">
            <option value="Practice Sessions">Practice Session</option>
            <option value="Lessons">Lesson</option>
            <option value="Performances">Performance</option>
            <option value="Master Classes">Master Class</option>
            <option value="Other">Other</option>
        </select>
        <input name="title" type="text" id="title" placeholder="Your Title">
        <textarea name="body" id="body" cols="100" rows="40" class="left-block__new-entry__text-body"></textarea>
        <input type="submit" value="SUBMIT">
    </form>
`)


const addPost= e => {
  e.preventDefault();

  const title = $('#title').val();
  const category = $('#categories').val();
  const body = $('#body').val();

  const data = new FormData();
  data.append('json', JSON.stringify({ title: title, category: category, body: body }));

  fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: data,
  })
    .then(res => res.json())
    .then(data => {
      $(".left-block").empty();

  $('.left-block').append(`
  <p>Your post was submitted successfuly!</p>
  `);
      
    })
    .catch(error => {
      $(".left-block").empty();

    $('.left-block').append(`
    <p>Oops, your post was not submmitted!</p>
   `);
      console.log(error);
    });
};

const goToEntry = data => {
  $('.right-block').empty();
  $(".left-block").empty();

  $('.left-block').append(`
  <h2 class="left-block__entry-heading">${data.title}</h2>
  <p class="left-block__entry-body">${data.content}</p>
  <p class="left-block__entry-category">In ${data.category}</p>
  `);
};

const goToNewEntry = () => {
  $('.right-block').empty();
  $('.left-block').html(new_entry);
  $('#addPost').submit(addPost);
};

const getPostById = id => {
  fetch(`http://localhost:8080/posts/${id}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    goToEntry(data)
  })
  .catch(err => console.log(err));
};

$('.left-block__post-summary__view-more').click(goToEntry);
$('.nav__list__add-entry').click(goToNewEntry);
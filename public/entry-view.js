$('.left-block__post-summary__view-more').click(goToEntry);
$('.header__add-entry').click(goToNewEntry);
$('.home').click();

const view_entry = $(`
<h2 class="left-block__entry-heading">Notes on my Senior Recital</h2>
<h3 class="left-block__entry-category">Performances</h3>
<p class="left-block__entry-body">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
`)

const new_entry = $(`
<textarea class="left-block__entry-heading" placeholder="Write your title here"></textarea>
<p class="left-block__entry-category">Add a new performance</p>
<textarea name="" id="" cols="100" rows="50" class="left-block__entry-body"></textarea>
`)

function goToEntry() {
  $('.left-block').html(view_entry);
}

function goToNewEntry() {
  $('.left-block').html(new_entry);
}


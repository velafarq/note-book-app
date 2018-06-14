$('.left-block__post-summary__view-more').click(goToEntry);
$('.right-block__add-entry').click(goToNewEntry);
$('.home').click();

const view_entry = $(`
<h2 class="left-block__entry-heading">Notes on my Senior Recital</h2>
<p class="left-block__entry-body">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
<p class="left-block__entry-category">In Performances</p>
`)

const new_entry = $(`
<form action="" class="left-block__new-entry">
        <p class="left-block__new-entry__category">Choose a category:</p>
        <select name="categories" id="categories" class="left-block__new-entry__category-list">
            <option value="practice">Practice Session</option>
            <option value="lesson">Lesson</option>
            <option value="performance">Performance</option>
            <option value="masterclass">Master Class</option>
            <option value="other">Other</option>
        </select>
        <input name="title" type="text" placeholder="Your Title">
        <textarea name="body" id="body" cols="100" rows="40"></textarea>
        <input type="submit">
    </form>


`)

function goToEntry() {
  $('.left-block').html(view_entry);
}

function goToNewEntry() {
  $('.left-block').html(new_entry);
}


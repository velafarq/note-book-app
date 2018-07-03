const new_entry = $(`
<form action="" class="main__block__new-entry" id="addPost">
        <p class="main__block__new-entry__category">Choose a category:</p>
        <select name="categories" id="categories" class="main__block__new-entry__category-list">
            <option value="Practice Sessions">Practice Session</option>
            <option value="Lessons">Lesson</option>
            <option value="Performances">Performance</option>
            <option value="Master Classes">Master Class</option>
            <option value="Other">Other</option>
        </select>
        <input name="title" type="text" id="title" placeholder="Your Title">
        <textarea name="body" id="body" class="main__block__new-entry__text-body"></textarea>
        <input type="submit" value="SUBMIT">
    </form>
`);
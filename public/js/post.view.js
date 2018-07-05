
const displayRecentPosts = (data) => {
  loggedInView();
  $(".main__block").empty();
  for (index in data) {
    $(".main__block").append(
      ` <section class="main__block__post-summary">
        <h3 class="main__block__post-summary__summary-heading">${data[index].title}</h3>
        <p class="main__block__post-summary__info">In: ${
          data[index].category
        }</p>
        <p class="main__block__post-summary-snippet">${data[index].content}</p>
        <a class="main__block__post-summary__view-more" onclick="getPostById('${
          data[index]._id
        }')">VIEW MORE <i class="fas fa-caret-right"></i></a>
    </section>`
    );
  }
}

const categoryFilter = (data, specificCategory) => {
  const categoryData = data.filter(post => post.category === specificCategory);
  loggedInView();
  $(".main__block").empty();

  for (index in categoryData) {
    $(".main__block").append(`<section class="main__block__post-summary">
        <h3 class="main__block__post-summary__summary-heading">${categoryData[index].title}</h3>
        <p class="main__block__post-summary__info">In: ${
          categoryData[index].category
        }</p>
        <p class="main__block__post-summary-snippet">${categoryData[index].content}</p>
        <a class="main__block__post-summary__view-more" onclick="getPostById('${
          categoryData[index]._id
        }')">VIEW MORE <i class="fas fa-caret-right"></i></a>
    </section>`);
  }
}




const goToNewEntry = () => {
  loggedInView();
  $(".main__block").html(new_entry);
  $('#addPost').submit(addPost);
};




  





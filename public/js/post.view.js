const displayRecentPosts = data => {
  loggedInView();
  $(".main__block").empty();
  for (index in data) {
    let date = new Date(data[index].created).toDateString();

    $("#category_results").html(`<h3> My Posts</h3>`);

    $(".main__block").append(
      ` <section class="main__block__post-summary">
      <div class="post-summary__heading"><i class="fas fa-bookmark"></i><h3 class="main__block__post-summary__summary-heading">${
        data[index].title
      }</h3></div>
      <p class="main__main__block__post-summary__date">${date}</p>
      <p class="main__block__post-summary__info">In: ${data[index].category}</p>
      <p class="main__block__post-summary-snippet">${data[index].content}</p>
      <a class="main__block__post-summary__view-more" onclick="getPostById('${
        data[index]._id
      }')">VIEW MORE <i class="fas fa-caret-right"></i></a>
  </section>`
    );
  }
};

const categoryFilter = (data, specificCategory) => {
  const categoryData = data.filter(post => post.category === specificCategory);
  loggedInView();
  $(".main__block").empty();
  $("#category_results").html(`<h3> My ${specificCategory}</h3>`);

  for (index in categoryData) {
    $(".main__block").append(`<section class="main__block__post-summary">
      <h3 class="main__block__post-summary__summary-heading">${
        categoryData[index].title
      }</h3>
      <p class="main__block__post-summary__info">In: ${
        categoryData[index].category
      }</p>
      <p class="main__block__post-summary-snippet">${
        categoryData[index].content
      }</p>
      <a class="main__block__post-summary__view-more" onclick="getPostById('${
        categoryData[index]._id
      }')">VIEW MORE <i class="fas fa-caret-right"></i></a>
  </section>`);
  }
};

const goToNewEntry = () => {
  loggedInView();

  $(".main__block").html(new_entry);
  $("#category_results").empty();
  $("#addPost").submit(addPost);
};


const displayRecentPosts = (data) => {
  $(".main__block").empty();
  for (index in data) {
    $(".main__block").append(
      ` <section class="main__block__post-summary">
        <h3 class="main__block__post-summary__summary-heading">${data[index].title}</h3>
        <p class="main__block__post-summary__info"><span>In: ${
          data[index].category
        }</span><span></span></p>
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
  $(".main__block").empty();

  for (index in categoryData) {
    $(".main__block").append(`<section class="main__block__post-summary">
        <h3 class="main__block__post-summary__summary-heading">${categoryData[index].title}</h3>
        <p class="main__block__post-summary__info"><span>In: ${
          categoryData[index].category
        }</span><span></span></p>
        <p class="main__block__post-summary-snippet">${categoryData[index].content}</p>
        <a class="main__block__post-summary__view-more" onclick="getPostById('${
          categoryData[index]._id
        }')">VIEW MORE <i class="fas fa-caret-right"></i></a>
    </section>`);
  }
}


// const goToEntry = data => {
//   $(".main__block").empty();
//     $(".main__block").append(`
//     <h2 class="main__block__entry-heading">${data.title}</h2>
//     <p class="main__block__entry-body">${data.content}</p>
//     <p class="main__block__entry-category">In ${data.category}</p>
//     <button id="edit" onclick="editPost(${data})">Edit</button>
//     <button id="delete" onclick="deletePost(${data._id})">Delete</button>
//   `);
// };

const goToNewEntry = () => {
  $(".main__block").html(new_entry);
  $('#addPost').submit(addPost);
};


const editPost = (data) => {
  
  $(".main__block").html(new_entry);
  $("#categories").val(`${data.category}`);
  $("#title").val(`${data.title}`);
  $("#body").val(`${data.content}`);

  $('#addPost').submit(updatePost(data._id));
  
}




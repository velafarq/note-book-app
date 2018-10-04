const addPost = e => {
  e.preventDefault();

  const title = $("#addPost")
    .find("#title")
    .val();

  const category = $("#addPost")
    .find("#categories")
    .val();
  const content = $("#addPost")
    .find("#body")
    .val();
  const data = JSON.stringify({
    title,
    category,
    content
  });
  $("#addPost")[0].reset();
  fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${localStorage.getItem("token")}`
    },
    body: data
  })
    .then(res => res.json())
    .then(data => {
      getData(displayRecentPosts);

      $("#results").html("Success!");
      setTimeout(() => {
        $("#results").hide();
      }, 4000);
    })
    .catch(error => {
      $(".main__block").empty();
      $(".main__block").append(`
    <p>Oops, your post was not submmitted!</p>
   `);
      console.log(error);
    });
};

const goToEntry = data => {
  $(".main__block").empty();
  $(".main__block").append(`
    <h2 class="main__block__entry-heading">${data.title}</h2>
    <p class="main__block__entry-body">${data.content}</p>
    <p class="main__block__entry-category">In ${data.category}</p>
    <button class="main__block__entry-btn" id="edit" value="${
      data._id
    }">Edit</button>
    <button class="main__block__entry-btn" id="delete" value="${
      data._id
    }">Delete</button>
  `);

  $("#delete").click(deletePost);

  $("#edit").click(editPost);
};

const getPostById = id => {
  fetch(`/posts/${id}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(data => {
      goToEntry(data);
    })
    .catch(err => console.log(err));
};

const getData = callback => {
  fetch(`/posts`, {
    method: "GET",
    headers: new Headers({
      Authorization: `bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(callback);
};

const getCategory = category => {
  fetch(`/posts`, {
    method: "GET",
    headers: new Headers({
      Authorization: `bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(data => categoryFilter(data, category))
    .catch(e => console.log(e));
};

function updatePost(e) {
  const _id = $(this).attr("value");

  e.preventDefault();

  const title = $("#addPost")
    .find("#title")
    .val();
  const category = $("#addPost")
    .find("#categories")
    .val();
  const content = $("#addPost")
    .find("#body")
    .val();

  $("#addPost")[0].reset();
  const data = JSON.stringify({
    _id,
    title,
    category,
    content
  });

  fetch(`/posts/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${localStorage.getItem("token")}`
    },
    body: data
  })
    .then(() => {
      getData(displayRecentPosts);

      $("#results").html("Success!");
      setTimeout(() => {
        $("#results").hide();
      }, 4000);
    })
    .catch(error => {
      $(".main__block").empty();
      $(".main__block").append(`
    <p>Oops, your post was not submmitted!</p>`);
      console.log(error);
    });
}

function editPost(e) {
  e.preventDefault();
  loggedInView();
  const id = $(this).val();
  fetch(`/posts/${id}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(data => {
      $(".main__block").html(new_entry);
      $("#categories").val(`${data.category}`);
      $("#title").val(`${data.title}`);
      $("#body").val(`${data.content}`);

      $("#addPost").attr("value", id);
      $("#addPost").submit(updatePost);
    })
    .catch(err => console.log(err));
}

function deletePost() {
  const id = $(this).val();
  fetch(`/posts/${id}`, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(data => {
      getData(displayRecentPosts);

      $("#results").html("Success!");
      setTimeout(() => {
        $("#results").hide();
      }, 4000);
    })
    .catch(error => {
      $(".main__block").empty();
      $(".main__block").append(`
<p>There was an error deleting your post. Please try again.</p>`);
    });
}

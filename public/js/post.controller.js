const addPost = e => {
    e.preventDefault();
  
    const title = $('#addPost').find('#title').val();
    const category = $('#addPost').find('#categories').val();
    const content = $('#addPost').find('#body').val();
    const data = JSON.stringify({
      title,
      category,
      content,
    });
  
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        $(".main__block").empty();
        $(".main__block").append(`
        <p>Your post was submitted successfuly!</p> 
        `);
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
      <button id="edit" onclick="editPost('${data._id}')">Edit</button>
      <button id="delete" onclick="deletePost('${data._id}')">Delete</button>
    `);
  };
  
  const getPostById = id => {
    fetch(`${BASE_URL}/posts/${id}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        goToEntry(data);
      })
      .catch(err => console.log(err));
  };


 const getData = (callback) => {
    fetch(`${BASE_URL}/posts`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(callback);
  
}
  
  const getCategory = (category) => {
    fetch(`${BASE_URL}/posts`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => categoryFilter(data, category))
      .catch(e => console.log(e));
  }
  


 const updatePost = (e) => {
   e.preventDefault()
   const id = localStorage.getItem('id');
   const title = $('#addPost').find('#title').val();
    const category = $('#addPost').find('#categories').val();
    const content = $('#addPost').find('#body').val();
    const data = JSON.stringify({
      id,
      title,
      category,
      content,
    });
  
    fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        $(".main__block").empty();
        $(".main__block").append(`
        <p>Your post was submitted successfuly!</p> 
        `);
      })
      .catch(error => {
        $(".main__block").empty();
        $(".main__block").append(`
      <p>Oops, your post was not submmitted!</p>`);
        console.log(error);
      });
  };

const deletePost = id => {

  fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }),
  })
  .then(res => res.json())
  .then(data => {
    $(".main__block").empty();
    $(".main__block").append(`
    <p>Your post has been deleted.</p>
   `)
   .catch(error => {
    $(".main__block").empty();
    $(".main__block").append(`
  <p>There was an error deleting your post. Please try again.</p>`);
   })
  })
};

const editPost = (id) => {
  localStorage.setItem('id', id);
  loggedInView();

  fetch(`${BASE_URL}/posts/${id}`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }),
  })
    .then(res => res.json())
    .then(data => {

  $(".main__block").html(new_entry);
  $("#categories").val(`${data.category}`);
  $("#title").val(`${data.title}`);
  $("#body").val(`${data.content}`);

  $('#addPost').submit(updatePost);
  
    })
    .catch(err => console.log(err));
};

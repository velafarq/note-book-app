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
  
    fetch(`${BASE_URL}/posts`, {
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
      <button id="edit" onclick="editPost(${data})">Edit</button>
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
  


 const updatePost = post => {
   const title = post.title;
   const category = post.category;
   const content = post.content;

   const data = JSON.stringify({
     title, 
     category, 
     content,
   })

   fetch(`${BASE_URL}/posts/${post._id}`, {
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => res.json())
      .then(() => {
        $(".main__block").empty();
        $(".main__block").append(`
      <p>Your post is updated!</p> 
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

const deletePost = id => {

  fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
  // .then(data => {
  //   $(".main__block").empty();
  //   $(".main__block").append(`
  //   <p>Your post has been deleted.</p>
  //  `)
  //  .catch(error => {
  //   $(".main__block").empty();
  //   $(".main__block").append(`
  // <p>There was an error deleting your post. Please try again.</p>`);
  //  })
  // })
};

$("#nav-categories").click(function() {
  $("#categories-dropdown").toggleClass('show');
  });
  
  // window.onclick = function(e) {
  //   if (!e.target.matches($categories)) {
  //     if ($("#categories-dropdown").hasClass('show')) {
  //       ($("#categories-dropdown")).removeClass('show');
  //     }
  //   }
  // };
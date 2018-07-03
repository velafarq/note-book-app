const addPost = e => {
    e.preventDefault();
  
    const title = $addPostForm.find('#title').val();
    const category = $addPostForm.find('#categories').val();
    const content = $addPostForm.find('#body').val();
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
        $mainBlock.empty();
        $mainBlock.append(`
        <p>Your post was submitted successfuly!</p> 
        `);
      })
      .catch(error => {
        $mainBlock.empty();
        $mainBlock.append(`
      <p>Oops, your post was not submmitted!</p>
     `);
        console.log(error);
      });
  };
  
  const getPostById = id => {
    fetch(`${BASE_URL}/posts/${id}`)
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

    return fetch(`${BASE_URL}/posts/${post._id}`, {
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => res.json())
      .then(() => {
        $mainBlock.empty();
      $mainBlock.append(`
      <p>Your post is updated!</p> 
      `);
    })
    .catch(error => {
      $mainBlock.empty();
      $mainBlock.append(`
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
  .then(data => {
    $mainBlock.empty();
      $mainBlock.append(`
    <p>Your post has been deleted.</p>
   `)
   .catch(error => {
    $mainBlock.empty();
    $mainBlock.append(`
  <p>There was an error deleting your post. Please try again.</p>`);
   })
  })
};

  $categories.click(function() {
    $categoryDropDown.toggleClass('show');
  });
  
  // window.onclick = function(e) {
  //   if (!e.target.matches($categories)) {
  //     if ($($categoryDropDown).hasClass('show')) {
  //       $($categoryDropDown).removeClass('show');
  //     }
  //   }
  // };
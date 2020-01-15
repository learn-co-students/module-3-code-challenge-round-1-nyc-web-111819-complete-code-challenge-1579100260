document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4396 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let likeBtn = document.getElementById('like_button')
  let likes = document.getElementById('likes')
  let form = document.getElementById('comment_form')
  let comments = document.getElementById('comments')

  function deleteComments() {
    comments.addEventListener('click', function(){
      if (event.target.className === 'delete-btn'){
        let parent = event.target.parentNode
        let id = parent.dataset.id
        fetch(`${commentsURL}/${id}`, {
          method: 'DELETE'
        })
        fetch(`${imageURL}`)
        .then(response => response.json())
        .then(image => {
          while (comments.hasChildNodes()) {  
            comments.removeChild(comments.firstChild);
          }
          image.comments.forEach(addComments)
        })
      }
    })
  }

  function addComments(comment) {
    let li = document.createElement('li')
    let deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-btn'
    deleteBtn.innerHTML = 'x'
    li.innerHTML = comment.content + " "
    li.dataset.id = comment.id
    li.append(deleteBtn)
    comments.append(li)
  }

  function displayImage(image) {
    let imageLocation = document.getElementById('image')
    let title = document.getElementById('name')
    imageLocation.src = image.url
    title.innerHTML = image.name
    likes.innerHTML = image.like_count
    image.comments.forEach(addComments)
    deleteComments()
  }

  function fetchImage() {
    fetch(`${imageURL}`)
    .then(response => response.json())
    .then(image => {
      console.log(image)
      displayImage(image)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  fetchImage()

  function addingLikes(likeBody) {
    fetch(`${likeURL}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify(likeBody)
    })
  }
  likeBtn.addEventListener('click', function(){
    let likesNumber = parseInt(likes.innerHTML)
    let likeBody = {image_id: imageId}
    likes.innerHTML = likesNumber + 1
    addingLikes(likeBody)
  })

  function addingComments(commentBody) {
    fetch(`${commentsURL}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify(commentBody)
    })
    .then(response => response.json())
    .then(comment => {
      addComments(comment)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  form.addEventListener('submit', function(){
    event.preventDefault()
    let comment = event.target.comment_input.value
    addingComments({image_id: imageId, content: comment})
    event.target.reset()
  })

})

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4390 //Enter the id from the fetched image here
  
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  const imageCard = document.getElementById('image_card')
  const imageTag = imageCard.querySelector('#image')
  const nameTag = imageCard.querySelector('#name')
  const likesTag = imageCard.querySelector('#likes')
  const commentsUl = imageCard.querySelector('#comments')
  
  const likeButton = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')

  getImage()

  // listen for likes
  likeButton.addEventListener('click', function(event){
    // optimistic rendering    
    likes = parseInt(likesTag.innerText)
    likesTag.innerText = ++likes

    configObj = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: imageId
      })
    }

    fetch(likeURL, configObj)
  })
  
  // listen for comment submission
  commentForm.addEventListener('submit', function(event){
    event.preventDefault()

    // only do somthing if there is content in the comment box
    if (event.target.comment.value !== "") {
      // pessimistic rendering
      configObj = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          content: event.target.comment.value
        })
      }

      fetch(commentsURL, configObj)
      .then(resp => resp.json())
      .then(comment => {
        renderComment(comment)
      })
    }
    commentForm.reset()
  })

  // listen for comment deletion on the whole comments ul
  commentsUl.addEventListener('click', function(event){
    if (event.target.tagName === "BUTTON") {
      id = parseInt(event.target.dataset.id)
      
      fetch(commentsURL + id, {method: "DELETE"})
      
      event.target.parentNode.remove()
    }
  })
  
  function getImage() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => {
      imageCard.dataset.id = image.id
      imageTag.src = image.url
      nameTag.innerText = image.name      
      likesTag.innerText = image.like_count

      image.comments.forEach(function(comment){
        renderComment(comment)
      })
    })
  }

  function renderComment(comment) {
    li = document.createElement('li')
    li.dataset.id = comment.id
    li.innerText = comment.content

    deleteButton = document.createElement('button')
    deleteButton.dataset.id = comment.id
    deleteButton.className = 'delete btn'
    deleteButton.innerText = "×"

    li.appendChild(deleteButton)
    commentsUl.appendChild(li)
  }

})

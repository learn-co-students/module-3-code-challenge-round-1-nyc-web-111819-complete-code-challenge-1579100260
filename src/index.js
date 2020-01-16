document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4389
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function fetchImage() {
    fetch(imageURL)
    .then(response => {return response.json()})
    .then(image => {renderImage(image)})
  } // end of fetchImage function

  fetchImage()

  let imageCardDiv = document.getElementById("image_card")
  let imagePic = document.getElementById("image")
  let imageTitle = document.getElementById("name")
  let commentsUl = document.getElementById("comments")
  let likeSpan = document.getElementById("likes")
  let likeButton = document.getElementById("like_button")
  let commentForm = document.getElementById("comment_form")
  


  function renderImage(image) {
    imagePic.src = image.url 
    imageTitle.innerText = image.name 
    likeSpan.innerText = parseInt(likeSpan.innerText)
    likeSpan.innerText = image.like_count

    image.comments.forEach(comment => {
      let commentLi = document.createElement('li')
      commentLi.innerText = comment.content
      commentsUl.appendChild(commentLi)
    })
  } // end of renderImage

  likeButton.addEventListener("click", function(e) {
    likeSpan.innerText++
    updateLikes(e)
  }) // end of like button function

  function updateLikes(e) {
    let configObj = {
      method: 'POST', 
      headers: {
        'Accept': 'applicat\]ion/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    }

    fetch(likeURL, configObj)

  } 

  commentForm.addEventListener("submit", function(e) {
    e.preventDefault()

    let userComment = document.createElement('li')
    userComment.innerText = e.target.comment.value
    commentsUl.appendChild(userComment)

    let imageObject = {image_id: imageId, content: userComment.innerText}

    fetch(commentsURL, {
      method: 'POST', 
      headers: {
      'Accept': 'applicat\]ion/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(imageObject)
    })
   
     
    e.target.reset()
      


    

    

  }) // end of comment form

  

}) // end of the main function



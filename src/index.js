document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4389

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function fetchImage() {
    fetch(imageURL)
    .then(response => {return response.json()})
    .then(image => {
      renderImage(image)
    })
  } // end of fetchImage function

  fetchImage()

  let imageCardDiv = document.getElementById("image_card")
  let imagePic = document.getElementById("image")
  let imageTitle = document.getElementById("name")
  let imageComments = document.getElementById("comments")
  let likeSpan = document.getElementById("likes")
  let likeButton = document.getElementById("like_button")
  let commentForm = document.getElementById("comment_form")

  function renderImage(image) {

    // console.log(likeSpan)

    imagePic.src = image.url 
    imageTitle.innerText = image.name 
    likeSpan.innerText = image.like_count
    imageComments = image.comments

    let commentLi = document.createElement('li')

    imageComments.forEach(comment => {
      commentLi.innerText = comment.content
    })
  
    imageCardDiv.insertAdjacentElement("beforebegin", imagePic)
    imageCardDiv.insertAdjacentElement("afterbegin", imageTitle)
    imageCardDiv.appendChild(likeSpan)
    imageCardDiv.insertAdjacentElement("beforeend", likeButton)
    imageCardDiv.insertAdjacentElement("beforeend", commentForm)
    imageCardDiv.appendChild(commentLi)
    
  }

  likeButton.addEventListener("click", function(e, imageId) {
    likeSpan.innerText++

    fetch(likeURL, {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId}),
      })
      

  }) // end of like button function

}) // end of the main function



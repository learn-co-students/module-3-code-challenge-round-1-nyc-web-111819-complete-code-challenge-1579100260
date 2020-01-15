document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4394 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  function fetchImage() {
    fetch(imageURL)
      .then(resp => resp.json())
      .then(image =>{
        renderImage(image)
        // renderComments(image)
      })
    // renderLikes(image)

  }
  fetchImage()
  let imageCard = document.getElementById('image_card')
  let img = document.getElementById('image')
  let comments = document.getElementById("comments")
  let name = document.getElementById('name')
  let likes = document.getElementById('likes')
  // let li = document.createElement('li')
  // console.log(imageDiv)
  function renderImage(image) {
    img.src = image.url
    img.dataset.id = image.id
    name.textContent = image.name
    likes.textContent = image.like_count
    likes.dataset.id = image.id
    let li = document.createElement('li')
    image.comments.forEach(comment => {
      console.log(comment)
      li.textContent= comment.content
      comments.appendChild(li)
    })
    // li.textContent = image.comments
    // comments.appendChild(li)
  }
  let button = document.getElementById("like_button")


  document.addEventListener("click", function (e) {
    if (e.target === button){
      // console.log(likes.innerText)
      likes.innerText = parseInt(likes.innerText) + 1
      saveLikes()
      // console.log("You pushed my button")
      // let numberLike = parseInt(likes.innerText)
      // likes = numberLike + 1
      // console.log(likes)
    }
  }) // end of event listener

  function saveLikes(){
    console.log(likes.dataset.id)
    let newLikeCount = {image_id: likes.dataset.id}
    fetch(likeURL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(newLikeCount)
    }) // end of fetch
  } // end of saveLikes
  document.addEventListener("submit", function(e){
    e.preventDefault()
    let comment = document.getElementById("comment_input").value
    console.log(comment)
    fetch(commentsURL, {
      method: "POST",
      headers: {
        "content-type:": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(comment)
    }).then(resp => resp.json()).then(image => renderImage(image))


  })
  
  // function renderComments(image){
 
  // }
  // }



















})

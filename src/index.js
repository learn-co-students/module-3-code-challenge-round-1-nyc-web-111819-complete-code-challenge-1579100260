document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4386
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

    fetch(imageURL)
    .then(response => response.json())
    .then(image => {
      console.log(image)
      renderImage(image)        
      })

  function renderImage(image) {
    let imageDiv = document.getElementById("image_card")
    imageDiv.innerHTML = `
    <img src=${image.url} id="image" data-id="${image.id}"/>
          <h4 id="name">${image.name}</h4>
          <span>Likes:
            <span id="likes">${image.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
          
          </ul>
          
          `
            image.comments.forEach(comment => {
              console.log(comment) 
              let li = document.createElement('li')
              li.innerText = comment.content
              let ul = document.getElementById("comments")
              ul.appendChild(li)
            })
  }

  document.addEventListener('click', function (e) {
    if (e.target.id === "like_button") {
      console.log("clicked like")
      let likes = document.getElementById("likes")
      likes.innerText = parseInt(likes.innerText) + 1
      fetch(likeURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({image_id: imageId }),
      })
    }
  })

  document.addEventListener('submit', function(e){
    e.preventDefault()
    let newComment = document.createElement('li')
    let commentList = document.getElementById("comments")
    if ( e.target.id === "comment_form"){
      console.log("clicked form")
      newComment.innerText = e.target.elements[0].value
      commentList.appendChild(newComment)
      fetch(commentsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          image_id: imageId,
          content: newComment.innerText
        })
      })
    }
    e.target.reset();
  })
   
})

  
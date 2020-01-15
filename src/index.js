document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4393

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // project variables
  let img = document.getElementById("image")
  let commentUl = document.getElementById("comments")
  let likesSpan = document.getElementById("likes")
  let imgName = document.getElementById("name")
  let imgCard = document.getElementById("image_card")
  let commentForm = document.getElementById("comment_form")

  function getImage () {
    // GET fetch request
    fetch(`${imageURL}`)
    .then(response => response.json())
    .then(image => {
      // render image to page
      img.src = image.url

      // render image comments to page
      image.comments.forEach(comment => {
        let commentLi = document.createElement("li")
        commentLi.id = comment.id
        commentLi.innerHTML = `
        <span>${comment.content}</span>
        <button class="delete-btn">Delete</button>
        `
        commentUl.append(commentLi)
      })

      // render image name
      imgName.innerText = `${image.name}`

      // render likes count
      likesSpan.innerText = `${image.like_count}`
    })
  }
  getImage()

  imgCard.addEventListener("click", (e) => {
    // like button
    if (e.target.id === "like_button") {
      // update DOM likes count
      let numLikes = parseInt(likesSpan.innerText)
      likesSpan.innerText = numLikes + 1

      // update database likes count
      // POST fetch request
      fetch(`${likeURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({image_id: imageId})
      })
    }

    // comment submit button
    else if (e.target.value === "Submit") {
      // prevent page reload on submit
      e.preventDefault()
      // defining for later...
      let commentContent = e.target.parentNode.children[0].value

      // pessimistically rendering new comments
      // update database with new comment
      // POST fetch request
      fetch(`${commentsURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          image_id: imageId,
          content: commentContent
        })
      })
      .then(response => response.json())
      .then(comment => {
        let commentLi = document.createElement("li")
        commentLi.id = comment.id
        commentLi.innerHTML = `
        <span>${comment.content}</span>
        <button class="delete-btn">Delete</button>
        `
        commentForm.reset()
        commentUl.append(commentLi)
      })
    }

    // bonus: comment delete btn 
    else if (e.target.className === "delete-btn") {
      // pessimistically delete comment from database 
      // DELETE fetch request
      let commentId = e.target.parentNode.id
      fetch(`${commentsURL}/${commentId}`, {
        method: "DELETE"
      })
      .then(response => response.json())
      .then(comment => {
        console.log(comment)
        let commentLi = e.target.parentNode
        commentLi.remove()
      })
    }
  })

})

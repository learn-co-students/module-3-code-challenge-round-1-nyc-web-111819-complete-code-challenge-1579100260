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
    fetch(`${imageURL}`)
    .then(response => response.json())
    .then(image => {
      // render image to page
      img.src = image.url

      // render image comments to page
      image.comments.forEach((comment) => {
        let commentLi = document.createElement("li")
        commentLi.innerText = `${comment.content}`
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
    else if (e.target.type === "submit") {
      e.preventDefault()
      let commentContent = e.target.parentNode.children[0].value

      // render new comments to page
      let commentLi = document.createElement("li")
      commentLi.innerText = `${commentContent}`
      commentForm.reset()
      commentUl.append(commentLi)

      // update database with new comment
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
    }
  })

})

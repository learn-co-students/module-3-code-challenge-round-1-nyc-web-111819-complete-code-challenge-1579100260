document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 4387 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

    let img = document.getElementById("image")
    let title = document.getElementById("name")
    let likes = document.getElementById("likes")
    let button = document.getElementById("like_button")
    let commentUl = document.getElementById("comments")
    let submitBtn = document.getElementsByTagName("input")[1]

  getImage()
  function getImage() {
    fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(resp => resp.json())
    .then(imgInf => {
      loadImage(imgInf)
    })
  }

  function loadImage(imgInf) {
    button.dataset.id = imgInf.id
    submitBtn.dataset.id = imgInf.id
    img.src = imgInf.url
    img
    title.innerText = imgInf.name
    likes.innerText = imgInf.like_count
    imgInf.comments.forEach(comment => listComment(comment))

    submitBtn.addEventListener("click", function(e) {
      e.preventDefault()
      let imgId = e.target.dataset.id
      let values = document.getElementsByTagName("input")[0].value
      fetch('https://randopic.herokuapp.com/comments', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {image_id: imgId, content: values})
      })
      .then(resp => resp.json())
      .then(image => {
        imgInf.commments << image
        let li = document.createElement("li")
        li.innerText = image.content
        commentUl.append(li)
      })  
    })
  }

  function listComment(comment) {
        let li = document.createElement("li")
        li.innerText = comment.content
        commentUl.append(li)
  }

  button.addEventListener("click", function(e) {
    likes.innerText++
    let imgId = e.target.dataset.id
    fetch('https://randopic.herokuapp.com/likes', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({image_id: imgId})
    })
    .then(resp => resp.json())
    .then(image => {
      image.like_count++
    })
  })
    
})

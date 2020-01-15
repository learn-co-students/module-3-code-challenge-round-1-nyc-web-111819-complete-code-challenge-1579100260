document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4154

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function getData() {
    fetch(imageURL)
    .then(response => response.json())
    .then(function (data) {
      renderImage(data.url, data.id)
      renderName(data.name)
      renderLikes(data.like_count)
      renderComments(data.comments)
    })
  }

  function renderImage(url, id) {
    let img = document.getElementById('image')
    img.src = url
    img.dataset.id =  id
  }
  
  function renderName(name) {
    let nameH4 = document.getElementById('name')
    nameH4.innerText = name
  }

  function renderLikes(like_count) {
    let likes = document.getElementById('likes')
    likes.innerText = like_count
  }
  
  function renderComments(comments) {
    comments.forEach(function (comment) {
      renderComment(comment.content, comment.id)
    })
  }
  
  function renderComment(comment, id) {
    let ul = document.getElementById('comments')
    let li = document.createElement('li')
    let p = document.createElement('span')
    let button = document.createElement('button')

    li.dataset.id = id
    p.innerText = comment
    button.innerText = "x"
    button.className = 'delete'

    li.append(p)
    li.append(button)
    
    ul.append(li)

    return li
  }

  document.addEventListener('click', function(e) {
    if (e.target.id === 'like_button') {

      let likes = document.getElementById('likes')
      let newLikeCount = parseInt(likes.innerText) + 1
      renderLikes(newLikeCount)

      fetch(likeURL, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({ image_id: imageId })
      })
    } else if (e.target.className === "delete") {

      let li = e.target.parentNode
      let id = li.dataset.id
      li.remove()

      fetch(`${commentsURL}${id}`, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json',
          accept: 'application/json'
        }
      })
    }
  })

  document.addEventListener('submit', function (e) {
    e.preventDefault()
    let comment = e.target.comment.value
    let li = renderComment(comment)

    fetch(commentsURL, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({ image_id: imageId, content: comment })
    }) 
    .then(response => response.json())
    .then(function(data) {
      li.dataset.id = data.id
    })
  })
  
  getData()
})

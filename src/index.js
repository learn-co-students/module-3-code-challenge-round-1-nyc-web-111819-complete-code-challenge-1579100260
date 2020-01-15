document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4384

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const deleteURL = 'https://randopic.herokuapp.com/comments/'

  let comments = document.getElementById('comments')
  function renderImage(){
    fetch(imageURL)
    .then(response => {
      return response.json()
    })
    .then(jayson =>{
      document.getElementById('image').src = jayson.url
      document.getElementById('image').id = jayson.id
      document.getElementById('name').innerText = jayson.name
      document.getElementById('likes').innerText = jayson.like_count
      jayson.comments.forEach(comment =>{
        let lee = document.createElement('li')
        lee.innerText = comment.content
        let deleat = document.createElement('button')
        deleat.id = comment.id
        deleat.innerText = "Delete"
        lee.appendChild(deleat)
        comments.appendChild(lee)
      })
    })
  }
  renderImage()
  let eyeD = document.getElementsByTagName('img')[0]
  document.addEventListener('click', e => {
    if(e.target.id === 'like_button'){
      let likes = document.getElementById('likes')
      likes.innerText = parseInt(likes.innerText) + 1
      fetch(likeURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          image_id: eyeD.id,
          likes: likes.innerText
        }),
      })
    }
    if(e.target.value === 'Submit'){
      e.preventDefault()
      let comment = document.getElementById('comment_input').value
      e.target.parentNode.reset()
      let lee = document.createElement('li')
      lee.innerText = comment
      let deleat = document.createElement('button')
      deleat.innerText = "Delete"
      lee.appendChild(deleat)
      comments.appendChild(lee)
      fetch(commentsURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          image_id: eyeD.id,
          content: comment
        })
      })
      .then(response =>{
        return response.json()
      })
      .then(jayson =>{
        deleat.id = jayson.id
      })
    }
    if(e.target.innerText === 'Delete'){
      fetch(deleteURL+e.target.id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
      e.target.parentNode.remove()
    }
  })
})

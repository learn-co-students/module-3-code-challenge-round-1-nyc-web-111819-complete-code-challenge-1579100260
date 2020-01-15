document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 4388 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  loadImage()

  let imgContainer = document.getElementById("image-container")

  function loadImage() {
    fetch(imageURL).then(resp => resp.json())
    .then(image => {
      // console.log(image.comments[0].content)
      renderImage(image)
    })
  }


  function renderImage(image) {
    let imgDiv = document.createElement('div')

    let imgE = document.createElement('img')
    imgE.src = image.url
    imgE.id = 'image'
    imgE.dataset.id = image.id
    imgDiv.appendChild(imgE)

    let imgNameH4 = document.createElement('h4')
    imgNameH4.innerText = image.name
    imgNameH4.id = 'name'
    imgDiv.appendChild(imgNameH4)

    let likeSpan = document.createElement('span')
    likeSpan.innerText = 'Likes:'
    imgDiv.appendChild(likeSpan)

    let likeCount = document.createElement('span')
    likeCount.id = 'likes'
    likeCount.innerText = image.like_count
    likeSpan.appendChild(likeCount)

    let likeBtn = document.createElement('button')
    likeBtn.dataset.id = image.id 
    likeBtn.id = 'like_button'
    likeBtn.innerText = 'Like'
    imgDiv.appendChild(likeBtn)

    let commentForm = document.createElement('form')
    commentForm.innerHTML = `
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    `
    commentForm.id = 'comment_form'
    commentForm.dataset.id = imageId
    imgDiv.appendChild(commentForm)

    let commentUl = document.createElement('ul')
    commentUl.id = 'comments'
    imgDiv.appendChild(commentUl)

    image.comments.map(comment => {
      let commentLi = document.createElement('li')
      commentLi.innerText = comment.content
      commentUl.appendChild(commentLi)

      let deleteBtn = document.createElement('button')
      deleteBtn.innerText = 'X'
      deleteBtn.dataset.id = comment.id
      commentLi.appendChild(deleteBtn)
    })

    imgDiv.id = 'image_card'
    imgDiv.className = 'card col-md-4'
    imgContainer.parentNode.insertBefore(imgDiv, imgContainer.nextSibling)

    likeBtn.addEventListener('click', function(e){
      // console.log(e.target.dataset.id)
      likeImg(e.target.dataset.id)
    })

    commentForm.addEventListener('submit', function(e){
      e.preventDefault()
      // console.log(e.target.dataset.id)
      addComment(e.target.dataset.id, e.target[0].value, commentUl)
      e.target.reset()
    })

    
  }

  function likeImg(id) {
    fetch(likeURL, {
      method: 'POST',
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({'image_id': id})
    })
    let likeCount = document.getElementById('likes')
    let likeCountInt = parseInt(likeCount.innerText)
    likeCount.innerText = likeCountInt + 1
    
  }

  function addComment(id, content, commentUl) {
    fetch(commentsURL, {
      method: 'POST',
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({'image_id': id,
        'content': content})
    })
    let commentLi = document.createElement('li')
    commentLi.innerText = content
    commentUl.appendChild(commentLi)

    let deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'X'
    commentLi.appendChild(deleteBtn)
  }

  // function deleteComment (id) {
  //   fetch(commentsURL, )
  // }




})

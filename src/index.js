document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4391 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

function fetchImage(){
  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => {
    let containerDiv = document.getElementsByClassName('container')[0]
      containerDiv.innerHTML = `
        <div class="row" id="image_content">
        <div class="card col-md-4"></div>
        <div id="image_card" class="card col-md-4">
            <img src=${image.url} id="image" data-id=${image.id}/>
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
                <!-- <li> for each comment goes here -->
            </ul>
          </div>
        <div class="card col-md-4"></div>
      </div>
      `
  }
)}//end of fetchImage
fetchImage(image)


// document.addEventListener('click', function(event){
// let likeButton = document.getElementById('like_button')
let containerDiv = document.getElementsByClassName('container')[0]
containerDiv.addEventListener('click', function(event){
  event.preventDefault()
  console.log(event.target)
  let span = document.getElementById('likes')
  if (event.target.innerText === 'Like'){
  span.innerText++
  fetch(likeURL, {
    method: 'POST',
    headers:{
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })//end of fetch
  }//end of if statement
})//end of event listener

let submitInput = document.getElementsByTagName('INPUT')[1]
let commentForm = document.querySelector('form')

commentForm.addEventListener('submit', function(event){
  event.preventDefault()
  console.log(event.target)
  if (event.target.innerText === 'Submit')
  debugger
  // let commentUl = document.getElementById('comments')
  // let commentLi = document.createElement('li')
  //   commentLi.innerText = event.target.parentNode.value
  //   commentLi.innerText = event.target.childNode.value
  //   commentUl.appendChild(li)
  // let deleteButton = document.createElement('BUTTON')
  //   commentLi.appendChild(deleteButton)
  // console.log(event.target)
  // event.preventDefault()
  // debugger
  
  
  fetch(commentsURL, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: {
      image_id: imageId,
      // content: event.target.parentNode.value
      content: event.target.childNode.value
    }
  })//end of fetch
})//end of submit event listener

})//end of DOM event listener

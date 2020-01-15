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
      renderImage()
        
      })
    
  
  
  function renderImage() {
    let div = document.createElement('div')
    div.innerHTML =
     `<div id="image_card" class="card col-md-4">
          <img src="${imageURL}" id="image" data-id="${imageId}"/>
          <h4 id="name">${"Title of image goes here"}</h4>
          <span>Likes:
            <span id="likes">Likes Go Here</span>
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

        `

  }
  


})

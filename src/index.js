let imageId = 4392 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`
const imgContainer = document.getElementById("image_content")
const likesContainer = document.getElementById("likes")
const commentsContainer = document.getElementById("comments")
const commentInput = document.getElementById("comment_input")
const imgName = document.getElementById("name")
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  console.log(imgContainer)
  renderImage()
})

function renderImage(){
  fetch(imageURL)
  .then(response => response.json())
  .then(result => {
//     - the image url
// - the image name
// - the number of likes
// - any comments in an unordered list

    // console.log(result.url)
    let myImg = document.createElement("img")
    myImg.src = result.url 
    imgContainer.appendChild(myImg)

   let myImgName = document.createElement("h1")
   myImgName.innerText = result.name 
    imgName.append(myImgName)

   let myLikes = document.createElement("span")
   myLikes.innerText = result.like_count
   myLikes.id = "like-counter"
    likesContainer.append(myLikes)
    result.comments.forEach(comment => {
      console.log(comment)
      let myComment = document.createElement("li")
      myComment.innerText = comment.content
      commentsContainer.append(myComment)
    });
  })
}

document.addEventListener('click', function(e){
  // e.preventDefault()
let counter = document.getElementById("like-counter")
let countNum = parseInt(counter.innerText)
if (e.target.innerText === "Like"){
  countNum++ 
  counter.innerText = countNum
  fetch("https://randopic.herokuapp.com/likes", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ "image_id": imageId }),
  })
  .then(response => response.json())
  .then(result => console.log(result))
  // console.log("yoooo")
}

})

document.addEventListener('submit', function(e){
  e.preventDefault()
if (e.target.id = "comment_form" ){
  console.log(e.target.elements[0].value)
 let newComment = document.createElement("li")
 newComment.innerText = e.target.elements[0].value
 commentsContainer.append(newComment)
 fetch("https://randopic.herokuapp.com/comments", {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({ 
    "image_id": imageId, 
    "content": newComment.innerText
  }),
})
.then(response => response.json())
.then(result => console.log(result))

}
})
document.addEventListener('DOMContentLoaded', () => {
        console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

        let imageId = 4395 //Enter the id from the fetched image here

        const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

        const likeURL = `https://randopic.herokuapp.com/likes/`

        const commentsURL = `https://randopic.herokuapp.com/comments/`

        const imgContainerDiv = document.querySelector("#image_card")
        const form = getElementById("comment_form")
        let ul = document.getElementById("comments")
            // create get fetch for getting the image 
            // create element
            // add dataset to element 
            // inner html = renderImage(arg) function
            // append

        function getImage() {
            fetch(imageURL)
                .then(response => response.json())
                .then(image => {
                    imageDiv = document.createElement('div')
                    imageDiv.dataset.id = image.id
                    imageDiv.innerText = renderImage(image)
                    imgContainerDiv.append(imageDiv)
                }) //end to second .then
        } // ends getImage function


        function renderImage(image) {
            let titleHeader = document.getElementById("name")
            titleHeader.innerText = image.name
            let spanLikes = document.getElementById("likes")
            spanLikes.innerText = image.like_count
            let imgContainer = document.getElementById("image")
            imgContainer.innerHTML = imageOnly(image)
            imgContainerDiv.append(imgContainer)
            li = document.createElement('li')
            li.innerText = image.comments.forEach(comment => {
                comment.content
            })
            ul.append(li)
        } //ends renderImage function

        function imageOnly(image) {
            return `<img src=${image.url}>`
        } //ends imgonly function


        getImage()


        // create event listener for form submit
        // dont forget e.preventdefault
        // make input answers into an object
        // post fetch
        // append into ul

        form.addEventListener('submit', function(e) {
                e.preventDefault()
                let commentContent = document.getElementById("comment_input").value

                NewComment = {
                    "content": commentContent
                }

                fetch(imageURL, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            accepts: "application/json"
                        },
                        body: JSON.stringify(NewComment)
                    }) //ends fetch
                    .then(response => response.json())
                    .then(function(comment) {
                        let li = document.createElement('li')
                        li.innerText = NewComment
                        ul.append(li)
                    }) //ends second .then 


            }) //ends submit event listener

        // set span count to variable
        let likeCounter = document.getElementById("likes")

        // add eventlistener for click like button
        // define button with id
        // set span text to count of 0
        // if correct button increment span text
        document.addEventListener('click', function(e) {
                likeCounter.innerText = 0
                let likeBtn = document.getElementById("like_button")
                if (e.target.id === likeBtn)
                    likeCount++
                    // getImage()

            }) // ends click event listener

    }) //ends DOMContentLoaded
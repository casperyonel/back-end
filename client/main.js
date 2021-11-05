const postsContainer = document.querySelector('#posts-container')
let form = document.querySelector('form')

document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

document.getElementById('fortuneButton').onclick = function () {
    axios.get("http://localhost:4000/api/fortune/")
       .then(function (response) {
        const data = response.data
        alert(data)
    })
}

const postsCallback = ({ data: posts }) => displayPosts(posts)
const errCallback = err => console.log(err)

const getAllPosts = () => axios.get("http://localhost:4000/api/getAllPosts/").then(postsCallback).catch(errCallback)
const createPost = body => axios.post("http://localhost:4000/api/createPost/", body).then(postsCallback).catch(errCallback)
const deletePost = id => axios.delete(`http://localhost:4000/api/deletePost/${id}`).then(postsCallback).catch(errCallback)
const updatePost = (id, type) => axios.put(`http://localhost:4000/api/updatePost/${id}`, {type}).then(postsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.getElementById('title')
    let goalsForToday = document.getElementById('goalsForToday')
    let imageURL = document.getElementById('imageURL')
    let likes = document.getElementById('likes')

    let newPost = {
        title: title.value,
        goalsForToday: goalsForToday.value,
        imageURL: imageURL.value,
        likes: +likes.value,
    }

    createPost(newPost)

    title.value = ''
    goalsForToday.value = ''
    imageURL.value = ''
    likes.value = ''
}

function createPostCard(post) {
    const postCard = document.createElement('div')
    postCard.classList.add('post-card')

    postCard.innerHTML = `<img alt='post cover image' src=${post.imageURL} class="post-cover-image"/>
    <h4 class="title">${post.title}</h4>
    <p class="goals-for-today">${post.goalsForToday}</p>
    <button id="id2" onclick="deletePost(${post.id})">delete</button>
    <div class="btns-container">
        <button onclick="updatePost(${post.id}, 'Like')">Like</button>
        <p class="post-likes">$${post.likes}</p>
        <button onclick="updatePost(${post.id}, 'Dislike')">Dislike</button>
    </div>
    `

    postsContainer.appendChild(postCard)
}

function displayPosts(arr) {
    postsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createPostCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllPosts()
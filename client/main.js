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

function submitHandler(e) {
    e.preventDefault()

    let feelingScale = document.getElementById('feelingScale')
    let goalsForToday = document.getElementById('goalsForToday')
    let imageURL = document.getElementById('imageURL')

    console.log(feelingScale)

    let newPost = {
        feelingScale: feelingScale.value,
        goalsForToday: goalsForToday.value,
        imageURL: imageURL.value,
    }

    createPost(newPost)

    feelingScale.value = ''
    goalsForToday.value = ''
    imageURL.value = ''
}

function createPostCard(post) {
    const postCard = document.createElement('div')
    postCard.classList.add('post-card')

    postCard.innerHTML = `
    <img alt='post cover image' src=${post.imageURL} class="post-cover-image"/>
    <p class="feeling-scale>${post.feelingScale}</p>
    <p class="goals-for-today>${post.goalsForToday}</p>
    <button onclick="deletePost(f${post.id})">delete</button>
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
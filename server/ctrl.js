const posts = require("./db.json")
let globalID = 2

module.exports = {
    getCompliment: (req, res) => {
        const compliments = 
        [
            "Gee, you're a smart cookie!",
            "Cool shirt!",
            "Your Javascript skills are stellar.",
        ]
        
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
        
        res.status(200).send(randomCompliment);
        
    },
    getFortune: (req, res) => {
        const fortunes = 
        [
            "Don’t just think, act!",
            "From now on your kindness will lead you to success.",
            "Success is failure turned inside out."
        ]

        let randomIndex = Math.floor(Math.random() * fortunes.length)
        let randomFortune = fortunes[randomIndex]

        res.status(200).send(randomFortune)
    },
    getAllPosts: (req, res) => {
        res.status(200).send(posts)
    },
    createPost: (req, res) => {
        let {title, goalsForToday, imageURL, likes} = req.body
        let newPost = {
            title, 
            goalsForToday, 
            imageURL,
            likes,
            id: globalID
        }
        console.log(posts)
        posts.push(newPost)
        res.status(200).send(posts)
        globalID++
    }, 
    deletePost: (req, res) => {
        let {id} = req.params
        let index = posts.findIndex(elem => +elem.id === +id)
        posts.splice(index, 1)
        res.status(200).send(posts)
    },
    updatePost: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        
        let index = posts.findIndex(elem => +elem.id === +id)
        if (posts[index].likes === 0 && type === 'Dislike') {
            res.status(400).send("Cannot go below zero likes")
        } else if (posts[index].likes > 0 && type === 'Dislike') {
            posts[index].likes -= 1
            res.status(200).send(posts)
        } else if (posts[index].likes > 0 && type === 'Like') {
            posts[index].likes += 1
            res.status(200).send(posts)
        }
    }
}
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
        let {feelingScale, goalsForToday, imageURL} = req.body
        let newPost = {
            feelingScale, 
            goalsForToday, 
            imageURL,
            id: globalID
        }
        console.log(posts)
        posts.push(newPost)
        res.status(200).send(posts)
        globalID++
    }
}
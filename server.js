const express = require('express');
const port = 5000;

const ideas = [
    {
        id : 1,
        text : 'Positive NewsLetter. a newsletter that only shares positive, uplifiting news',
        tag : 'Technology',
        username : 'TonyStark',
        date : '2022-01-02',
    },
    {
        id : 2,
        text : 'Milk cartons that turn a different color the older that your milk is getting',
        tag : 'Invention',
        username : 'SteveRogers',
        date : '2022-01-02',
    },
    {
        id : 1,
        text : 'ATM location app which lets you know where the closet ATM is and id it is in service',
        tag : 'Software',
        username : 'BruceBanner',
        date : '2022-01-02',
    }
]

const app = express();

app.get('/' , (req, res) => {
    res.send({message : 'Welcome to the RandomIdeas API'})
})
// Get all Ideas
app.get('/api/ideas' , (req, res) => {
    res.send({ success : true, data : ideas})
})

app.get('/api/ideas/:id' , (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id)

    if (!idea) {
        return res.status(404).json({
            success : false,
            error : 'Resource Not found'
        })
    };

    res.send({ success : true, data : idea})
})

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})
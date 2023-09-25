const{places,descriptors}= require('./seedHelper');
const Campground = require('../Models/campground');
const Cities = require('./Cities');

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/camp-ground", { useNewUrlParser: true , useUnifiedTopology: true})
    .then( () => {
        console.log("Mongoose Connected");
    })
    .catch( (err) => {
        console.log("Mongoose Not Connected");
        console.log(err)
    });

    const sample = array => array[Math.floor(Math.random() * array.length)];


    const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+ 10;
        const camp = new Campground({
            location: `${Cities[random1000].city}, ${Cities[random1000].state}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus repellendus similique autem veniam quam maxime sunt accusamus laudantium dolorem vel placeat, magni ea quo deleniti fugiat totam sapiente fugit ipsum.',
            price
        })
        await camp.save();
    }
    }

    seedDB().then(() => {
    mongoose.connection.close();
    })
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
        const camp = new Campground({
            location: `${Cities[random1000].city}, ${Cities[random1000].state}`,
            name: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
    }

    seedDB().then(() => {
    mongoose.connection.close();
    })
const express = require('express');
const path = require('path');
const Campground = require('./Models/campground');
const catchAsync = require('./utility/catchAsync');
const expressError = require('./utility/expressError');
const { campGroundSchema } = require('./schema')
const JOI = require('joi');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const campground = require('./Models/campground');
const { error } = require('console');
const Joi = require('joi');
mongoose.connect("mongodb://127.0.0.1:27017/camp-ground", { useNewUrlParser: true , useUnifiedTopology: true})
    .then( () => {
        console.log("Mongoose Connected");
    })
    .catch( (err) => {
        console.log("Mongoose Not Connected");
        console.log(err)
    });


const app = express();



app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views')) 



app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));


const validateCampground = (req, res, next) => {
  const { error } = campGroundSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new expressError(msg, 400)
  } else {
      next();
  }
}



app.get('/', (req,res) => {
  res.render('home');
});

app.get('/campgrounds', catchAsync (async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('Campgrounds/allCamps', {campgrounds})
}));

app.get('/campgrounds/new', (req,res) => {
  res.render('Campgrounds/new')
})

app.post('/campgrounds', validateCampground , catchAsync( async (req, res) => {
  const campground = new Campground(req.body.Campground)
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`)
}))

app.get('/campgrounds/:id', catchAsync(async (req,res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/show',{campground})
}));

app.get('/campgrounds/:id/edit', catchAsync(async (req , res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/edit',{campground})
}));


app.put('/campgrounds/:id', validateCampground ,catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.Campground });
  res.redirect(`/campgrounds/${campground._id}`)
}));

app.delete('/campgrounds/:id', catchAsync(async(req , res) => {
  const{id} = req.params;
  await Campground.findByIdAndDelete(id)
  res.redirect('/campgrounds')
}))







app.all('*' , (req , res , next) => {
  next(new expressError('Page not Found', 404 ))
})

app.use( (err , req , res , next) => {
  const { statuscode = 505} = err;
  if(!err.message) err.message = 'Something went wrong'
  res.status(statuscode).render('error' , { err });
})



app.listen(3000, () => {
  console.log( "listening on port 3000");
})
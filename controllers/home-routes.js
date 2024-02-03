const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');


// GET for Homepage
router.get('/', async (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  })
});

// GET for Register page
router.get('/register', (req, res) => {

  res.render('register');
});

// GET for rendering Login page - redirects to dashboard upon completion
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
}
);

// GET for rendering Dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET for Recipes search
router.get('/recipes/:search', async (req, res) => {

  let recipeURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${req.params.search}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`;
  let data = await fetch(recipeURL);
  const newdata = await data.json();
  let hits = newdata.hits

  res.render('recipes', {
    loggedIn: req.session.loggedIn,
    hits: hits
  })
});

// Displays Recipes page in handlebars
router.get('/recipes', async (req, res) => {

  res.render('recipes', {
    loggedIn: req.session.loggedIn,
  })
});

module.exports = router;

const express = require('express');

const router = express.Router();

router.get('/main', (req, res) => {
  // const Quote = "Your quote goes here";
  // Quote.findOneAndUpdate ()
  //     .then(quote => {
  //       res.render('main', {quote: quote});
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       res.status(500).send('Error retrieving quote');
  //     });
  res.render('main') 
  });

module.exports = router;
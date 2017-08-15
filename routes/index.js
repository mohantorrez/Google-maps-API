var express = require('express'),
	router = express.Router();

router.get("/", (req, res)=>{
	res.render('index', {
    	title: "Sample Google map API",
    	apiKey : process.env.apiKey
   	});
});
router.get("/search", (req, res)=>{
	res.render('search', {
    	title: "Search Box with AutoComplete",
    	apiKey : process.env.apiKey
   	});
});
router.get("/marker", (req, res)=>{
	res.render('marker', {
    	title: "Custom Marker",
    	apiKey : process.env.apiKey
   	});
});
router.get("/directions", (req, res)=>{
	res.render('directions', {
    	title: "Directions",
    	apiKey : process.env.apiKey
   	});
});
//router.get("/error", function);

module.exports = router;

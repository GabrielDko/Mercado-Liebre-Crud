const { json } = require('express');
const {setJson,getJson} = require("../utility/jsonMethod");
const { v4: uuidv4 } = require('uuid');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");




const controller = {
	index: (req, res) => {
		const products = getJson("productsDataBase")
		const visitedProducts = products.filter(producto => producto.category == "visited")
		const inSaleProducts = products.filter(producto => producto.category == "in-sale")
		res.render("index", {visitedProducts,inSaleProducts,toThousand})

	},
	search: (req, res) => {
		const userSearch = req.query.keywords
        const userResults = [];
		let products = getJson("productsDataBase")
        products.forEach(producto => {
            if(producto.name.toLowerCase().includes(userSearch.toLowerCase())){
				
                userResults.push(producto)
            }
        })
		console.log(userSearch);
		res.render("results",{userResults,userSearch,toThousand})
	},
};

module.exports = controller;

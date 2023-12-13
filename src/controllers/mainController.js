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
		res.render("results")
	},
};

module.exports = controller;

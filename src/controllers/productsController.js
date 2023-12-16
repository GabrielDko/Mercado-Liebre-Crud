const { json } = require('express');
const {setJson,getJson} = require("../utility/jsonMethod");
const { v4: uuidv4 } = require('uuid');
uuidv4(); 

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = getJson("productsDataBase")
		res.render("products/products", {products,toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let {id} = req.params;
		const products = getJson("productsDataBase")
		const producto = products.find(producto => producto.id == id)
		res.render("products/detail", {producto,toThousand})
		
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("products/product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res, err) => {
		const products = getJson("productsDataBase")
		producto = req.body;
		producto.id = uuidv4(); 
		producto.image = req.file.filename
		products.push(producto)
		setJson(products,"productsDataBase")
		res.redirect("/products")
		console.log(req.file);
	},

	// Update - Form to edit
	edit: (req, res) => {
		const products = getJson("productsDataBase")
		let {id} = req.params;
		const producto = products.find(producto => producto.id == id)
		res.render("products/product-edit-form",{producto,toThousand})
	},
	// Update - Method to update
	update: (req, res) => {
		const products = getJson("productsDataBase")
		const {id} = req.params;
		const {name,description,discount,price,category,image} = req.body
		productsModify = products.map(producto => {
            if (producto.id == id) {
                return{
                id,
                name:name.trim(),
                description: description.trim(),
                image: image ? image : producto.image,
                discount,
				price,
				category
                }
			}
			return producto
		});
		
		setJson(productsModify,"productsDataBase")
		res.redirect(`/products/detail/${id}`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let products = getJson("productsDataBase")
		const {id} = req.params
		products = products.filter(producto => producto.id != id)
		setJson(products,"productsDataBase")
		res.redirect("/products")
	}
	
};

module.exports = controller;
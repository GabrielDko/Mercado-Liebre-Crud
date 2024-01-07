// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, "../../public/images/products");
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        let imageName = "product-" + file.fieldname + "-" +  Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})

const fileUpload = multer({ storage })

// ************ Controller Require ************
const {index,create,store,detail,edit,update,destroy} = require('../controllers/productsController');
const logDBMiddleware = require("../middlewares/logDBMiddleware")

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 


/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create); 
router.post('/store',logDBMiddleware,fileUpload.single("image"), store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit); 
router.put('/update/:id', update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', destroy); 


module.exports = router;

const express = require("express");
const router = express.Router();
const path = require("path")
const multer = require("multer")

const { body } = require("express-validator")

const validations = [
    body('name')
    .notEmpty().withMessage("Este campo es obligatorio").bail()
    .isLength({min: 5, max: 16}).withMessage("El mínimo de carácteres para éste texto es de 5 (y un máximo de 16)"),
    body('username')
    .notEmpty().withMessage("Debe completar el campo con su nombre de usuario").bail()
    .isLength({min: 5, max: 16}).withMessage("El mínimo de carácteres para éste texto es de 5 (y un máximo de 16)"),
    body('email')
    .notEmpty().withMessage("Ingrese un correo electrónico").bail()
    .isEmail().withMessage("Debes escribir un formato de correo valido"),
    body('date')
    .notEmpty().withMessage("Ingrese una fecha correcta"),
    body('categoryInterest')
    .notEmpty().withMessage("Este campo es obligatorio"),
    body('password')
    .notEmpty().withMessage("Este campo es obligatorio").bail()
    .isLength({min: 5, max: 18}).withMessage("El mínimo de carácteres para éste texto es de 5 (y un máximo de 18)").bail(),
    body('repassword')
    .notEmpty().withMessage("Este campo es obligatorio").bail()
    .isLength({min: 5, max: 18}).withMessage("El mínimo de carácteres para éste texto es de 5 (y un máximo de 18)").bail(),
    body('image').custom((value, { req })=>{
        let file = req.file;
        let acceptedExtensions = ['.jpg','.png','.gif']
        if(!file){
            throw new Error("Debe subir una imagen")
        } else {
        let fileExtension = path.extname(file.originalname)
        if(!acceptedExtensions.includes(fileExtension)){
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`)
        }
        }
        return true
    })
]

const {register,store} = require("../controllers/usersController")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, "../../public/images/users");
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        let imageName = "user-pf-" + file.fieldname + "-" +  Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})
const fileUpload = multer({ storage })

router.get("/register", register)
router.post("/store",fileUpload.single("image"),validations, store)

module.exports = router;
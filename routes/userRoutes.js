const express = require("express")
const router = express.Router()
const { UserListController, UserAddController, UserUpdateController, UserRemoveController } = require("../controllers/user/userController")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/profiles'); // Specify the folder where files should be saved
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set file naming convention
    }
});
const upload = multer({ 
    storage: storage,
    limits:{
        fileSize : 1048576 //1mb
    }
})

router.get("/", UserListController)
router.post("/add-user", upload.single("profile_pic"), UserAddController)
router.put("/update-user", UserUpdateController)
router.delete("/remove-user", UserRemoveController)

module.exports = router
const User = require("../../models/userModel");
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const UserListController = async(req, res) =>{
    try {
        const data = await User.find(); 
        return res.status(200).json({
            data: data,
            message: "User data fetched successfully",
            success: true,
            
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

const UserAddController = async(req, res) =>{

    const { email, password} = req.body
    if(!email){
        return res.status(400).json({
            message:"Email is required",
            success:false,
        });
    }

    try {
        if(email){
            const existingUser = await User.findOne({email : email})
            if(existingUser ){
                return res.status(400).json({
                    message: "Email is already exist", 
                    success:false
                });
            }
        }
    
        let profilePic = null;
        if (req?.file) {
            profilePic = req.file.filename; 
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await User.create({
            ...req.body,
            password: hashedPassword, 
            profile_pic: profilePic, 
        });
    
        return res.status(200).json({
            data:data,
            message:"User added successfully",
            success:true,
    
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

const UserUpdateController = async(req, res) =>{
    try {
        const { id, ...updateData } = req.body;
        if(!id || mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: "valid id is required",
                success: true
            });
        }

        const data = await User.updateOne({_id : id},  { $set: updateData });
        if(data.matchedCount === 0){
            return res.status(400).json({
                message: "User is not found", 
                success:false
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            success: true
        });   
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    } 
}

const UserRemoveController = async(req, res) =>{
    try {
        const DeleteId = req.query.id;
        if(!DeleteId){
            return res.status(400).json({
                message: "id is required", 
                success:false
            });
        }

        const user = await User.findById(DeleteId);
        if (!user) {
            return res.status(400).json({
                message: "User not found", 
                success: false
            });
        }
        
        if (user?.profile_pic) {
            const filePath = path.resolve(__dirname, '../../assets/profiles', user.profile_pic);

            if (fs.existsSync(filePath)) { 
                try {
                    fs.unlinkSync(filePath);
                    console.log('File deleted successfully');
                } catch (err) {
                    return res.status(400).json({
                        data: err,
                        message: "User deleted successfully",
                        success: true,
                    });
                }
            } else {
                console.log('File does not exist:', filePath);
            }
        }

        // Proceed to delete the user from the database
        const data = await User.findByIdAndDelete(DeleteId);
    
        return res.status(200).json({
            data: data,
            message: "User deleted successfully",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports = {
    UserListController,
    UserAddController,
    UserUpdateController,
    UserRemoveController
}
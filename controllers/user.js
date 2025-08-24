const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const alldbuser = await User.find({});
    return res.json(alldbuser);
}

async function handleGetUserById(req, res) {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ status: "user not found" });
    }
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    const userId = req.params.id;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
        return res.status(404).json({ status: "user not found" });
    }
    return res.json(user);
}

async function handleDeleteUserById(req, res) {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        return res.status(404).json({ status: "user not found" });
    }
    return res.json({ status: "success" });
}

async function handleCreateUser(req, res) {
     const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.age
    ){
        return res.status(400).json({status:"error"});
    }

    const result= await User.create({
        first_name :body.first_name,
        last_name :body.last_name,
        email :body.email,
        gender :body.gender,
        age :body.age
    });


   return res.status(201).json({status:"success", id:result._id});
   }

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
};
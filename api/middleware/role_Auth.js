const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    console.log("This is ", decoded);
    if (decoded.role !== "admin"){
        return res.send({message: "You're not an admin"})
    }
    next();
} catch (error) {
    return res.status(400).json({
        message: "Auth failed"
    })}
    
    
}
import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET
export const authRequired = (req,res,next) => {
    const {token} = req.cookies;
    
    if(!token){
        return res.status(401).json({message: "No token, authorization denied"});
    }

    jwt.verify(token,TOKEN_SECRET,(err, user) => {
        if(err) return res.status(403).json({message:"Invelid token"});
        
        req.user = user 
        
        next();
    });
    }


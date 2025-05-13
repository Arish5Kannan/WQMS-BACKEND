const authorizeRole=(allowedroles)=>{
    return (req,res,next)=>{
        if(!req.user || !allowedroles.includes(req.user.role)){
            return res.status(403).send({message:'Forbidden : insufficient permission'});
        }
        next();
    };
};

export default {authorizeRole};
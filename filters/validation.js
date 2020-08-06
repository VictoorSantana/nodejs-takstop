
const { SECRET_KEY, INITIAL_ID } = require('../properties/setup');
const { NO_ACESS, BAD_REQUEST, INVALID_TOKEN } = require('../properties/messages');

const jwt = require('jsonwebtoken');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const { error, value } = schema.validate( req.body );

            if(error !== undefined) {
                return res.json({fail: true, message: BAD_REQUEST, data: error});
            } else {
                next();
            }            
        }
    }, 
    validateTokenAlso: (schema) => {
        return (req, res, next) => {
            const bearerHeader = req.headers['authorization'];
            if(typeof bearerHeader !== 'undefined') {

                const {error , value} = schema.validate( req.body );
                
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];                

                if(error !== undefined) {                    
                    return res.status(400).json(error);
                } else {                      
                    jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
                        if(err) {
                            return res.json({fail: true, message: INVALID_TOKEN, data: {}}); 
                        }else {
                            next();
                        }
                    });                   
                }                                        

            }else {
                return res.json({fail: true, message: NO_ACESS, data: {}}); //Forbidden
            }
                                       
        }
    },   
    validateTokenAlsoGetUser: (schema) => {
        return (req, res, next) => {
            const bearerHeader = req.headers['authorization'];
            
            if(typeof bearerHeader !== 'undefined') {

                const {error , value} = schema.validate( req.body );
                
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];                

                if(error !== undefined) {                    
                    return res.status(400).json(error);
                } else {                      
                    jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
                        if(err) {
                            return res.json({fail: true, message: INVALID_TOKEN, data: {}}); 
                        }else {
                            req.decoded = decoded._id.toString().substring(INITIAL_ID.length, decoded._id.length);
                            next();
                        }
                    });                   
                }                                        

            }else {
                return res.json({fail: true, message: NO_ACESS, data: {}}); //Forbidden
            }
                                       
        }
    }, 
    validateTokenGetUser: () => {
        return (req, res, next) => {
            const bearerHeader = req.headers.authorization;
            if(typeof bearerHeader !== 'undefined') {            
                
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];                
                                
                jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
                    if(err) {
                        return res.json({fail: true, message: INVALID_TOKEN, data: {}});   
                    } else {                                                
                        req.decoded = decoded._id.toString().substring(INITIAL_ID.length, decoded._id.length);                        
                        next();
                    }
                });                                   

            }else {
                return res.json({fail: true, message: NO_ACESS, data: {}});
            }

            //next();
        }
    },    
    validateToken: () => {
        return (req, res, next) => {
            const bearerHeader = req.headers.authorization;
            if(typeof bearerHeader !== 'undefined') {            
                
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];                
                                
                jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
                    if(err) {
                        return res.json({fail: true, message: INVALID_TOKEN, data: {}});   
                    } else {
                        next();
                    }
                });                                   

            }else {
                return res.json({fail: true, message: NO_ACESS, data: {}});
            }            

            //next();
        }
    }
}
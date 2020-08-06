
const { SECRET_KEY, SECRET_KEY_EXPIRES, INITIAL_ID } = require('../properties/setup');
const model = require('../models/credentials');
const jwt = require('jsonwebtoken');

module.exports = {

    verify: async (username = '', password = '') => {

        const dbData = await model.findAll({
            where: { username, password }
        });

        
        if( dbData.length > 0 ) {
            const token = await jwt.sign({ _id: INITIAL_ID + dbData[0].id }, SECRET_KEY, {expiresIn: SECRET_KEY_EXPIRES});              

            return {
                fail: false,
                message: ['You have been logged in!'],
                records: [{ token }]
            }

        } else {
            return {
                fail: true,
                message: ['Username or password are incorrect!'],
                records: []
            }
        }                

    },


    getUsername: async(userId = '') => {
        
        const dbData = await model.findAll(
            {
                attributes: ['username'],
                where: {
                    id: userId,                 
                }
            }
        );
        
        try {
            return {
                fail: !(dbData[0].username.length > 0),
                message: dbData[0].username.length > 0 ? ['Active user'] : ['Invalid user'],
                records: dbData[0].username.length > 0 ? [ dbData[0] ] : []
            }
        } catch(e) {
            return {
                fail: false,
                message: ['Invalid user token'],
                records: [dbData]
            }
        }        

    }



}
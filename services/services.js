
const tb_todolist = require('../models/todolist');
const tb_credentials = require('../models/credentials');

module.exports = {
    Credential: {
        check: async (username, password) => {            

            const credential = await tb_credentials.findAll({
                where: { username, password }
            });

            if(credential.length > 0) { 
                //console.log(credential[0].dataValues.id);
                return await { id: credential[0].dataValues.id, valid: true };
            } else {
                return await { id: 0, valid: false };
            }

        }
    },
    ToDoList: {
        add: async (data) => {           
            return await tb_todolist.create(data);
        },
        getAll: async (id) => {
            return await tb_todolist.findAll({
                where: {
                  guest_user: id 
                }
            });             
        },
        get: async (id, status) => {
            return await tb_todolist.findAll({
                where: {
                  status,
                  guest_user: id 
                }
            });             
        },
        update: async (id, status, user_id) => {
            return await tb_todolist.update({ status }, {
                where: { id, guest_user: user_id }
              });
        }
    }
};
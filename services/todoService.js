
const model = require('../models/todolist');
const { IN_QUEUE } = require('../properties/status_todo');

module.exports = {


    getAllTasks: async (userId = 0) => {

        const dbData = await model.findAll({
            where: {
              guest_user: userId 
            }
        }); 


        return {
            fail: dbData.length == 0,
            message: dbData.length > 0 ? ['Task records found.'] : ['No tasks registered!'],
            records: dbData.length > 0 ? dbData : [] 
        }

    },


    findTask: async(userId = 0, status = '') => {

        const dbData = await model.findAll({
            where: {
              status,
              guest_user: userId 
            }
        }); 


        return {
            fail: dbData.length == 0,
            message: dbData.length > 0 ? ['Task records found'] : ['No tasks was found with that status!'],
            records: dbData.length > 0 ? dbData : [] 
        }

    },


    setTask: async(title = '', about = '', userId = 0) => {

        try {
            const dbData = await model.create({
                title,
                about,
                guest_user: userId,
                status: IN_QUEUE
            });
    
            return {
                fail: !(dbData.id > 0) ,
                message: dbData.id > 0 ? ['New task has been added to queue.'] : ['Sorry, an error occurred.'],
                records: dbData.id > 0 ? [dbData] : [] 
            }
        } catch(e) {
            return {
                fail: true ,
                message: [e.original.sqlMessage || e.original || e ],
                records: [] 
            }
        }
        

    },


    setStatus: async(userId = '', taskId = 0, newStatus = '') => {

        const dbData = await model.update({ status: newStatus }, {
            where: { 
                id: taskId, 
                guest_user: userId 
            }
        });
        
        return {
            fail: false,
            message: ['The status of task has been changed.'],
            records: []
        }

    }

}
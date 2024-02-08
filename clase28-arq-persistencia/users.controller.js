const { usersService } = require("../repositories/services.js")
class UserController {    
    constructor(){
        this.usersService = usersService
    }
    
    getUsers = async (req, res) =>{
        // sinc o async ?
        try {
            // const users = await usersModel.find({}).limit(50) // 5000 -> 100
            const users = await this.usersService.get()
            res.send(users)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    createUser = async (req, res) =>{
        try {
            const {first_name, last_name, email, password} = req.body
            // validación

            const newUser = {first_name, last_name, password, email}
            // console.log(newUser)
            const result = await this.usersService.create(newUser)
            
            res.status(201).send({ 
                status: 'success',
                payload: result        
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    
    updateUser = async (req, res) =>{
    
        const { uid } = req.params
        const userToReplace = req.body
        // venga el id
        const result = await this.usersService.update({_id: uid}, userToReplace)
        res.status(201).send({ 
            status: 'success',
            payload: result 
        })
    }
    
    deleteUser = async  (req, res)=> {
        const { uid } = req.params
    
        const result = await this.usersService.delete({_id: uid})
        res.status(200).send({ 
            status: "success", 
            payload: result 
        })
    }
}

module.exports = UserController
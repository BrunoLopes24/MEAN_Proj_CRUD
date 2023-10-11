import Employee from '../../db/models/employeeModel.js';
import { Types } from 'mongoose';
const { ObjectId } = Types;

export const getById = async (req, res) =>{
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send(`No employee found with Id ${req.params.id}`);
        }
        
        !ObjectId.isValid(req.params.id) ? res.status(400).send(`No record with given Id ${req.params.id}`): res.send(employee);
        
    } catch (err) {
        res.status(500).send(`Error in retrieving Employee: ${err.message}`);
    }

}
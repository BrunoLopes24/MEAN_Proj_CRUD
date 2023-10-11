import Employee from '../../db/models/employeeModel.js';

export const getAll = async (req, res) =>{
    try {
        const employees = await Employee.find().exec();
        res.send(employees);
    } catch (err) {
        res.status(500).json({ error: 'Error in retrieving Employees', details: err });
    }
}
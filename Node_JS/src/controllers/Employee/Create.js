import Employee from '../../db/models/employeeModel.js';

export const create = async (req, res) =>{
    const { name, position, office, salary } = req.body;
    const emp = new Employee({
        name,
        position,
        office,
        salary,
    });

    try {
        const savedEmployee = await emp.save();
        res.send(savedEmployee);
    } catch (err) {
        res.status(500).json({ error: 'Error in saving Employee', details: err });
    }

}
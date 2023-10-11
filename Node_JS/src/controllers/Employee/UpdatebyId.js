import Employee from '../../db/models/employeeModel.js';

export const updateById = async (req, res) =>{
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send(`No employee found with Id ${req.params.id}`);
        }

        const { name, position, office, salary } = req.body;
        const emp = {
            name,
            position,
            office,
            salary,
        };
        Employee.findByIdAndUpdate(req.params.id, {$set: emp}, { $new : true}, (err,doc) => {
            !err ? res.send(doc) : console.log("Error in retrieving Employee: " + json.stringify(err,undefined, 2));
        });
    } catch (err) {
        res.status(500).send(`Error in retrieving Employee: ${err.message}`);
    }
}
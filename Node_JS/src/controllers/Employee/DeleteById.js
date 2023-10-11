import Employee from "../../db/models/employeeModel.js";

export const deleteById = async (req, res) => {
  try {
    if (!objectId.isValid(req.params.id))
      return res
        .status(400)
        .send(`No record with given id: ${req - params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Employee Delete:" + JSON.stringify(err, undefined, 2)
        );
      }
    });
  } catch (err) {
    res.status(500).send(`Error in retrieving Employee: ${err.message}`);
  }
};

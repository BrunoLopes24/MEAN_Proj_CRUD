import mongoose from 'mongoose';

const employeeSchema =  new mongoose.Schema({ // mongoose.model( 'NOME TABELA' , {  ATRIBUTOS . . .   });
    name: {type: String},
    position: {type: String},
    office: {type: String},
    salary: {type: Number}
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
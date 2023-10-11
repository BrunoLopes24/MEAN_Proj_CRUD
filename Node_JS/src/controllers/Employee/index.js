import * as create from './Create.js';
import * as getById from './GetById.js';
import * as getAll from './GetAll.js';
import * as updateById from './UpdatebyId.js';
import * as deleteById from './DeleteById.js';

export const EmployeeController = {
    ...create,
    ...getById,
    ...getAll,
    ...updateById,
    ...deleteById,
}
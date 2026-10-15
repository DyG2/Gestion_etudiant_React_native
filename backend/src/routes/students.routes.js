const { Router } = require('express');
const studentsController = require('../controllers/students.controller');
const authenticate = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createStudentSchema, studentIdSchema } = require('../utils/validators');

const router = Router();

router.use(authenticate);

router.get('/', studentsController.list);
router.get('/:id', validate(studentIdSchema), studentsController.getById);
router.post('/', validate(createStudentSchema), studentsController.create);
router.delete('/:id', validate(studentIdSchema), studentsController.remove);

module.exports = router;

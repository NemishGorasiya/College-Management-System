import { Router } from 'express';
import httpStatus from 'http-status';
import Student from './Student.js';


const router = Router({ mergeParams: true });

//!PATH: /auth/student  

export default router;
import { Router } from 'express';
import httpStatus from 'http-status';
import Faculty from '../models/Faculty.js';


const router = Router({ mergeParams: true });

//!PATH: /auth/faculty  

export default router;
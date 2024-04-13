import { Router } from 'express';
import { changePassword, getProfile, userLogout } from './general.controller.js';

const router = Router({ mergeParams: true })

//PATH: /api/user

router
  .get("/logout", userLogout) //logout  
  .get("/my-profile", getProfile) //get the profile of the user
  .get("/change-password", changePassword) //change the password  
  .get("/forgot-password", forgotPassword) //forgot password 

export default router;
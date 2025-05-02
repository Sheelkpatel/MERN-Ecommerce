import express from 'express';
import { loginUser,registerUser,adminLogin, getallUser ,removeUser} from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/alluser',getallUser)
userRouter.delete('/delete/:id',removeUser)
export default userRouter;
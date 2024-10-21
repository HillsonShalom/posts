import { Router } from "express";
import getAll from "../controllers/users/getAll";
import getMe from "../controllers/users/getMe";
import register from "../controllers/users/register";
import login from "../controllers/users/login";
import updateUser from "../controllers/users/updateUser";
import deleteAccount from "../controllers/users/deleteAccount";
import logout from "../controllers/users/logout";
import { verifyToken } from "../middlwares/tokenMiddleware";

const router = Router()


router.get   ('/all'     , getAll       )
router.get   ('/'        , verifyToken, getMe       )
router.post  ('/register', register     )
router.post  ('/'        , login        )
router.patch ('/'        , verifyToken, updateUser   )
router.delete('/'        , verifyToken, deleteAccount)
router.get   ('/logout'  , verifyToken, logout       )

 
export default router
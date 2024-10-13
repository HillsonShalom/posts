import { Router } from "express";
import getAll from "../controllers/users/getAll";
import getOne from "../controllers/users/getOne";
import register from "../controllers/users/register";
import login from "../controllers/users/login";
import updateUser from "../controllers/users/updateUser";
import deleteAccount from "../controllers/users/deleteAccount";
import logout from "../controllers/users/logout";

const router = Router()


router.get   ('/all'     , getAll       )
router.get   ('/'        , getOne       )
router.post  ('/register', register     )
router.post  ('/'        , login        )
router.patch ('/'        , updateUser   )
router.delete('/'        , deleteAccount)
router.get   ('/'        , logout       )

 
export default router
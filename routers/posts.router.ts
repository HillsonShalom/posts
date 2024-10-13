import { Router } from "express"
import getAll from "../controllers/posts/getAll"
import getOne from "../controllers/posts/getOne"
import getMine from "../controllers/posts/getMy"
import getPage from "../controllers/posts/getPage"
import create from "../controllers/posts/create"
import update from "../controllers/posts/update"
import deleteP from "../controllers/posts/delete"

const router = Router()


router.get   ('/all'      , getAll )
router.get   ('/:id'      , getOne )
router.get   ('/'         , getMine)
router.get   ('/pages/:id', getPage)
router.post  ('/'         , create )
router.patch ('/'         , update )
router.delete('/'         , deleteP)

 
export default router
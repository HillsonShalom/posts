import { Router } from "express";
// import getAllOfOne from "../controllers/comments/getAllOfOne";
import getAllonMine from "../controllers/comments/getAllonMine";
import create from "../controllers/comments/create";
import update from "../controllers/comments/update";
import _delete from "../controllers/comments/delete";

const router = Router();


// router.get   ('/:id', getAllOfOne )
router.get   ('/'   , getAllonMine)
router.post  ('/'   , create      )
router.patch ('/'   , update      )
router.delete('/:postId/:id'   , _delete     )


export default router
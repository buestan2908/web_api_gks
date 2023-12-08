import { Router } from "express";
import { postMenuItems, postPage, postContentPage, getAll_Page, getPage_id} from "../controllers/pages.controller.js";

const router = Router();

// POST ROUTES
router.post('/create_page', postPage);

router.post('/create_menu_item', postMenuItems);

router.post('/create_content_page', postContentPage);

// GET ROUTES

router.get('/getPage', getAll_Page)

router.get('/getPage/:id', getPage_id)

export default router;
import express from "express";
import {
  createArticle,
  updateArticle,
  getAllRelationArticleUser,
  getSearchRelationArticleUser,
  deleteArticle,
  incrementArticleView,
  getArticleById
} from "../controllers/article.js";
import {
  validationArticle,
  validateArticleUpdate,
} from "../validation/articlevalidation.js";
import {verifyUser} from "../utils/verfyToken.js"

const router = express.Router();

//Users routes
router.post("/createArticle/:id", verifyUser,validationArticle, createArticle);
router.post("/updateArticle/:id", validateArticleUpdate, updateArticle);
router.get("/view/:id", getArticleById);
router.get("/", getAllRelationArticleUser);
router.get("/search/", getSearchRelationArticleUser);
router.delete("/deleteArticle/:id", deleteArticle);
// add counter view
router.post("/addView/:id", incrementArticleView);
export default router;

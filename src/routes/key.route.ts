import {
  createKey,
  deleteKey,
  getAllKeys,
  getKeyById,
  updateKey,
  verifyKey,
} from "@/controllers/key.controller";
import { validate, verifyToken } from "@/middleware";
import { CreateKeyDTO, UpdateKeyDTO } from "@/types/key/schemaDTO";
import { Router } from "express";

const router: Router = Router();

// 🔓 Public: hit logic (boleh tanpa token)
router.get("/verify/:id", verifyKey);

// 🔐 Protected: semua di bawah ini wajib pakai token

router.get("/", verifyToken, getAllKeys);
router.get("/:id", verifyToken, getKeyById);
router.post("/", verifyToken, validate(CreateKeyDTO), createKey); // Assuming createKey is defined in the controller
router.put("/:id", verifyToken, validate(UpdateKeyDTO), updateKey);
router.delete("/:id", verifyToken, deleteKey);

export default router;

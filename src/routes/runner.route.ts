import { Router } from "express";
import {
  createRunner,
  deleteRunner,
  getAllRunners,
  getLastScanned,
  getRunnerById,
  updateLastScanned,
  updateRunner,
} from "@/controllers/runner.controller";
import { validate } from "@/middleware";
import { CreateRunnerDTO, UpdateRunnerDTO } from "@/types/runner/schemaDTO";

const router: Router = Router();

router.post("/", validate(CreateRunnerDTO), createRunner);
router.get("/", getAllRunners);
router.get("/:id", getRunnerById);
router.put("/scan-bib/:id", updateLastScanned);
router.put("/:id", validate(UpdateRunnerDTO), updateRunner);
router.delete("/:id", deleteRunner);
router.get("/last-scanned", getLastScanned);

export default router;

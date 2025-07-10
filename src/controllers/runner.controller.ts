import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { CommonResponse } from "@/types/common/Response";

const prisma = new PrismaClient();

// ✅ Create Runner
export const createRunner = async (
  req: Request,
  res: Response<CommonResponse>
) => {
  const { name, run_type, last_scanned, bib } = req.body;

  try {
    const runner = await prisma.runner.create({
      data: {
        name,
        run_type,
        bib,
        last_scanned: last_scanned ? new Date(last_scanned) : null,
      },
    });

    return res.status(201).json({
      status: 201,
      message: "Runner created successfully",
      data: runner,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Failed to create runner",
      data: null,
      error,
    });
  }
};

// ✅ Get All Runners
export const getAllRunners = async (
  _req: Request,
  res: Response<CommonResponse>
) => {
  try {
    const runners = await prisma.runner.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      status: 200,
      message: "All runners retrieved",
      data: runners,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Failed to retrieve runners",
      data: null,
      error,
    });
  }
};

// ✅ Get One Runner by ID
export const getRunnerById = async (
  req: Request,
  res: Response<CommonResponse>
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid runner ID",
      data: null,
      error: null,
    });
  }

  try {
    const runner = await prisma.runner.findUnique({ where: { id } });

    if (!runner) {
      return res.status(404).json({
        status: 404,
        message: "Runner not found",
        data: null,
        error: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Runner found",
      data: runner,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error retrieving runner",
      data: null,
      error,
    });
  }
};

// ✅ Update Runner
export const updateRunner = async (
  req: Request,
  res: Response<CommonResponse>
) => {
  const id = Number(req.params.id);
  const { name, run_type, bib, last_scanned } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid runner ID",
      data: null,
      error: null,
    });
  }

  try {
    const runner = await prisma.runner.update({
      where: { id },
      data: {
        name,
        run_type,
        bib,
        last_scanned: last_scanned ? new Date(last_scanned) : null,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Runner updated successfully",
      data: runner,
      error: null,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(404).json({
        status: 404,
        message: "Runner not found",
        data: null,
        error,
      });
    }

    return res.status(400).json({
      status: 400,
      message: "Error updating runner",
      data: null,
      error,
    });
  }
};

// ✅ Delete Runner
export const deleteRunner = async (
  req: Request,
  res: Response<CommonResponse>
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid runner ID",
      data: null,
      error: null,
    });
  }

  try {
    await prisma.runner.delete({ where: { id } });

    return res.status(200).json({
      status: 200,
      message: "Runner deleted successfully",
      data: null,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error deleting runner",
      data: null,
      error,
    });
  }
};

// ✅ Update Last Scanned
export const updateLastScanned = async (
  req: Request,
  res: Response<CommonResponse>
) => {
  const bib = req.params.id;

  if (!bib) {
    return res.status(400).json({
      status: 400,
      message: "Invalid runner ID",
      data: null,
      error: null,
    });
  }

  try {
    const runner = await prisma.runner.update({
      where: { bib },
      data: { last_scanned: new Date() },
    });

    return res.status(200).json({
      status: 200,
      message: "Last scanned updated",
      data: runner,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Failed to update last scanned",
      data: null,
      error,
    });
  }
};

// ✅ Get Runner with Latest Scan
export const getLastScanned = async (
  _req: Request,
  res: Response<CommonResponse>
) => {
  try {
    const runner = await prisma.runner.findFirst({
      where: { last_scanned: { not: null } },
      orderBy: {
        last_scanned: "desc",
      },
    });

    if (!runner) {
      return res.status(404).json({
        status: 404,
        message: "No scanned runner found",
        data: null,
        error: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Latest scanned runner found",
      data: runner,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Failed to fetch runner",
      data: null,
      error,
    });
  }
};

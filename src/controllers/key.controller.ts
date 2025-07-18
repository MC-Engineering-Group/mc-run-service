import { CommonResponse } from "@/types/common/Response";
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// ✅ Create Key
export const createKey = async (
  req: Request,
  res: Response<CommonResponse>
) => {
  const {
    key,
    nama_key,
    expired_date,
    is_trial,
    max_hit,
    no_limit,
    hit_used,
    notes,
  } = req.body;

  try {
    const created = await prisma.key.create({
      data: {
        key,
        nama_key,
        expired_date: new Date(expired_date),
        is_trial,
        max_hit,
        no_limit,
        hit_used,
        notes,
      },
    });

    return res.status(201).json({
      status: 201,
      message: "Key created successfully",
      data: created,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Failed to create key",
      data: null,
      error,
    });
  }
};

// ✅ Get All Keys
export const getAllKeys = async (
  _req: Request,
  res: Response<CommonResponse>
) => {
  try {
    const keys = await prisma.key.findMany({
      orderBy: { expired_date: "desc" },
    });

    return res.status(200).json({
      status: 200,
      message: "All keys retrieved",
      data: keys,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Failed to retrieve keys",
      data: null,
      error,
    });
  }
};

// ✅ Get Key by ID
export const getKeyById = async (
  req: Request,
  res: Response<CommonResponse>
) => {
  const id = req.params.id;

  try {
    const key = await prisma.key.findUnique({ where: { id: Number(id) } });

    if (!key) {
      return res.status(404).json({
        status: 404,
        message: "Key not found",
        data: null,
        error: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Key found",
      data: key,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error retrieving key",
      data: null,
      error,
    });
  }
};

// ✅ Update Key
export const updateKey = async (
  req: Request,
  res: Response<CommonResponse>
) => {
  const id = req.params.id;
  const {
    nama_key,
    expired_date,
    is_trial,
    max_hit,
    no_limit,
    hit_used,
    notes,
    key,
  } = req.body;

  try {
    const updated = await prisma.key.update({
      where: { id: Number(id) },
      data: {
        nama_key,
        expired_date: new Date(expired_date),
        is_trial,
        max_hit,
        no_limit,
        hit_used,
        notes,
        key, // Update key if provided
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Key updated successfully",
      data: updated,
      error: null,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(404).json({
        status: 404,
        message: "Key not found",
        data: null,
        error,
      });
    }

    return res.status(400).json({
      status: 400,
      message: "Error updating key",
      data: null,
      error,
    });
  }
};

// ✅ Delete Key
export const deleteKey = async (
  req: Request,
  res: Response<CommonResponse>
) => {
  const id = req.params.id;

  try {
    await prisma.key.delete({ where: { key: id } });

    return res.status(200).json({
      status: 200,
      message: "Key deleted successfully",
      data: null,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error deleting key",
      data: null,
      error,
    });
  }
};

// ✅ Verify Key
export const verifyKey = async (
  req: Request,
  res: Response<CommonResponse>
) => {
  const keyParam = req.params.id;

  const key = await prisma.key.findUnique({
    where: { key: keyParam },
  });

  if (!key) {
    return res.status(404).json({
      status: 404,
      message: "Key not found",
      data: null,
      error: null,
    });
  }

  // 🕒 Check if no limit
  if (key.no_limit) {
    // increment hit_used if no_limit is true
    try {
      await prisma.key.update({
        where: { id: key.id },
        data: { hit_used: { increment: 1 } },
      });
      // If no limit, just return the key
      return res.status(200).json({
        status: 200,
        message: "Key is valid and has no usage limit",
        data: key,
        error: null,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Failed to increment hit used",
        data: null,
        error,
      });
    }
  }

  const now = new Date();

  // 🔒 Expired date check
  if (key.expired_date < now) {
    return res.status(403).json({
      status: 403,
      message: "License expired on " + key.expired_date.toISOString(),
      data: null,
      error: null,
    });
  }

  // 🧪 Trial-specific rules
  if (key.is_trial) {
    if (key.hit_used >= key.max_hit) {
      return res.status(403).json({
        status: 403,
        message: "Trial usage limit reached",
        data: null,
        error: null,
      });
    }
  }

  // ⚖️ Non-trial rules
  if (!key.no_limit && key.hit_used >= key.max_hit) {
    return res.status(403).json({
      status: 403,
      message: "Usage limit reached",
      data: null,
      error: null,
    });
  }

  try {
    const updatedKey = await prisma.key.update({
      where: { id: key.id },
      data: { hit_used: { increment: 1 } },
    });

    return res.status(200).json({
      status: 200,
      message: "Hit used incremented",
      data: updatedKey,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Failed to increment hit used",
      data: null,
      error,
    });
  }
};

import {
  findAllArtifacts,
  findArtifactsByUserId,
  createArtifact,
  existsType,
  existsStatus,
  deleteArtifactById,
  updateArtifactById,
} from "../models/artifact.model.js";

export async function listArtifacts(req, res, next) {
  try {
    const { limit, offset } = req.pagination || {};
    const data = await findAllArtifacts({ limit, offset });
    res.json(data);
  } catch (err) { next(err); }
}

export async function getMyArtifacts(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { limit, offset } = req.pagination || {};
    const data = await findArtifactsByUserId(userId, { limit, offset });
    res.json(data);
  } catch (err) { next(err); }
}

export async function deleteMyArtifact(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const id = Number(req.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await deleteArtifactById(id, userId);
    if (!deleted) return res.status(404).json({ error: "Artifact not found" });

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function createMyArtifact(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const {
      name,
      type_id,
      price,
      description = null,
      history = null,
      age = null,
      origin = null,
      image = null,
      status_id = 1,
    } = req.body || {};

    if (!name?.trim()) return res.status(400).json({ error: "name is required" });
    const typeIdNum = Number(type_id);
    const priceNum  = Number(price);
    const ageNum    = age == null || age === "" ? null : Number(age);
    const statusIdNum = Number(status_id) || 1;

    if (!Number.isFinite(typeIdNum)) return res.status(400).json({ error: "type_id must be a number" });
    if (!Number.isFinite(priceNum) || priceNum < 0) return res.status(400).json({ error: "price must be a positive number" });
    if (ageNum != null && (!Number.isFinite(ageNum) || ageNum < 0)) return res.status(400).json({ error: "age must be a positive number" });

    if (!(await existsType(typeIdNum)))   return res.status(400).json({ error: "Invalid type_id" });
    if (!(await existsStatus(statusIdNum))) return res.status(400).json({ error: "Invalid status_id" });

    const created = await createArtifact(userId, {
      name: name.trim(),
      type_id: typeIdNum,
      price: priceNum,
      description,
      history,
      age: ageNum,
      origin,
      image,
      status_id: statusIdNum,
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateMyArtifact(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const id = Number(req.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const {
      name,
      type_id,
      status_id,
      description,
      history,
      price,
      age,
      origin,
      image,
    } = req.body || {};

    const fields = {};

    if (name !== undefined) {
      if (!name.trim()) return res.status(400).json({ error: "name cannot be empty" });
      fields.name = name.trim();
    }

    if (type_id !== undefined) {
      const typeIdNum = Number(type_id);
      if (!Number.isFinite(typeIdNum)) return res.status(400).json({ error: "type_id must be a number" });
      if (!(await existsType(typeIdNum))) return res.status(400).json({ error: "Invalid type_id" });
      fields.type_id = typeIdNum;
    }

    if (status_id !== undefined) {
      const statusIdNum = Number(status_id);
      if (!Number.isFinite(statusIdNum)) return res.status(400).json({ error: "status_id must be a number" });
      if (!(await existsStatus(statusIdNum))) return res.status(400).json({ error: "Invalid status_id" });
      fields.status_id = statusIdNum;
    }

    if (price !== undefined) {
      const priceNum = Number(price);
      if (!Number.isFinite(priceNum) || priceNum < 0) return res.status(400).json({ error: "price must be a positive number" });
      fields.price = priceNum;
    }

    if (age !== undefined && age !== null && age !== "") {
      const ageNum = Number(age);
      if (!Number.isFinite(ageNum) || ageNum < 0) return res.status(400).json({ error: "age must be a positive number" });
      fields.age = ageNum;
    } else if (age === null || age === "") {
      fields.age = null;
    }

    if (description !== undefined) fields.description = description || null;
    if (history !== undefined)     fields.history     = history || null;
    if (origin !== undefined)      fields.origin      = origin || null;
    if (image !== undefined)       fields.image       = image || null;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const updated = await updateArtifactById(id, userId, fields);
    if (!updated) return res.status(404).json({ error: "Artifact not found" });

    return res.json(updated);
  } catch (err) {
    next(err);
  }
}
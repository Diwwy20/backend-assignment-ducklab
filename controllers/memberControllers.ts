import { Request, Response } from "express";
import prisma from "../config/prisma.ts";

export const createMember = async (req: Request, res: Response) => {
  try {
    const { prefix, firstName, lastName, birthDate, gender, about } = req.body;
    const member = await prisma.member.create({
      data: {
        prefix,
        firstName,
        lastName,
        birthDate: new Date(birthDate),
        gender,
        about,
      },
    });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Failed to create member" });
  }
};

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        orderBy: { id: "asc" },
        skip,
        take: limit,
      }),
      prisma.member.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: members,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch members" });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const member = await prisma.member.findUnique({
      where: { id },
    });
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch member" });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { prefix, firstName, lastName, birthDate, gender, about } = req.body;
    const updated = await prisma.member.update({
      where: { id },
      data: {
        prefix,
        firstName,
        lastName,
        birthDate: new Date(birthDate),
        gender,
        about,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update member" });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.member.delete({ where: { id } });
    res.json({
      message: "Member deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete member",
    });
  }
};

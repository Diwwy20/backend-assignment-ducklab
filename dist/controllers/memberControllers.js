"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.getMemberById = exports.getAllMembers = exports.createMember = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createMember = async (req, res) => {
    try {
        const { prefix, firstName, lastName, birthDate, gender, about } = req.body;
        const member = await prisma_1.default.member.create({
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
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create member" });
    }
};
exports.createMember = createMember;
const getAllMembers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const [members, total] = await Promise.all([
            prisma_1.default.member.findMany({
                orderBy: { id: "asc" },
                skip,
                take: limit,
            }),
            prisma_1.default.member.count(),
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
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch members" });
    }
};
exports.getAllMembers = getAllMembers;
const getMemberById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const member = await prisma_1.default.member.findUnique({
            where: { id },
        });
        if (!member)
            return res.status(404).json({ error: "Member not found" });
        res.json(member);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch member" });
    }
};
exports.getMemberById = getMemberById;
const updateMember = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { prefix, firstName, lastName, birthDate, gender, about } = req.body;
        const updated = await prisma_1.default.member.update({
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
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update member" });
    }
};
exports.updateMember = updateMember;
const deleteMember = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma_1.default.member.delete({ where: { id } });
        res.json({
            message: "Member deleted successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            error: "Failed to delete member",
        });
    }
};
exports.deleteMember = deleteMember;
//# sourceMappingURL=memberControllers.js.map
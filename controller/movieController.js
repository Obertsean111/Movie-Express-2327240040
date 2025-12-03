import mongoose from "mongoose";
import MovieModel from "../models/movieModel.js";


export const movie = async(req, res) => {
    try {
        const movie = await MovieModel.find({ createdBy: req.user ?.user_id,}).toSorted({ createdAt: -1 });

        res.status(200).json({
            message: "Daftar Semua Movie : ",
            data: movie,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server..",
            error: error.message,
            data: null,
        });
    }
};
export const addMovie = async(req, res) => {
    try {
        const { judul, tahunRilis, sutradara } = req.body;

        if (!user || !tahunRilis || !sutradara) {
            return res.status(400).json({
                message: "judul, tahunRilis, dan sutradara wajib diisi!",
                data: null,
            });
        }

        const movie = await MovieModel.create({ judul, tahunRilis, sutradara, createdBy: req.user ?.user_id });

        res.status(201).json({
            message: "Movie berhasil ditambahkan",
            data: movie,
        });
    } catch (error) {
        res.status(500).json({
            message: "Movie gagal ditambahkan",
            error: error.message,
            data: null,
        });
    }
};

export const detailsMovie = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id || mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID tidak valid",
                data: null,
            });
        }

        const movie = await MovieModel.findOne({
            _id: id,
            createdBy: req.user ?.user_id,
        });

        if (!movie) {
            return res.status(400).json({
                message: "Movie tidak ditemukan!",
                data: null,
            });
        }

        return res.status(200).json({
            message: "Detail movie : ",
            data: movie,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null,
        });
    }
};

export const updateMovie = async(req, res) => {
    try {
        const { id } = req.params;
        const { judul, tahunRilis, sutradara } = req.body;

        if (!id || mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID tidak valid",
                data: null,
            });
        }

        const response = await MovieModel.findOneAndUpdate({
            _id: id,
            createdBy: req.user ?.user_id,
        }, { judul, tahunRilis, sutradara }, { new: true });

        if (!response) {
            return res.status(404).json({
                message: "Movie tidak ditemukan atau akses ditolak!",
                data: null,
            });
        }

        return res.status(200).json({
            message: "Data movie berhasil diupdate",
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null,
        });
    }
};

export const deleteMovie = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id || mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID tidak valid",
                data: null,
            });
        }

        const response = await MovieModel.findByIdAndDelete({
            _id: id,
            createdBy: req.user ?.user_id,
        });

        if (!response) {
            return res.status(404).json({
                message: "Movie tidak ditemukan",
                data: response,
            });
        }

        return res.status(200).json({
            message: "Movie berhasil dihapus",
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};
const { response } = require('express');
const Nota = require('../models/Nota');

const getNotas = async (req, res = response) => {
    const notas = await Nota.find();
    res.json({
      ok: true,
      notas,
    });
};

const crearNota = async (req, res = response) => {
    const nota = new Nota(req.body);
    try {
      const notaGuardada = await nota.save();
      res.json({
        ok: true,
        nota: notaGuardada,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
      });
    }
};

const actualizarNota = async (req, res = response) => {
    const notaId = req.params.id;
    try {
      const nota = await Nota.findById(notaId);
      if (!nota) {
        return res.status(404).json({
          ok: false,
          msg: 'Nota no existe por ese id',
        });
      }
      const nuevaNota = {
        ...req.body
      };
      const notaActualizada = await Nota.findByIdAndUpdate(
        notaId,
        nuevaNota,
        { new: true }
      );
      res.json({
        ok: true,
        nota: notaActualizada,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
      });
    }
};

const eliminarNota = async (req, res = response) => {
    const notaId = req.params.id;
    try {
      const nota = await Nota.findById(notaId);
      if (!nota) {
        return res.status(404).json({
          ok: false,
          msg: 'Nota no existe por ese id',
        });
      }
      await Nota.findByIdAndDelete(notaId);
      res.json({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
      });
    }
};

const archivarNota = async (req, res = response) => {
    const { id, title, description, isFiled } = req.body;
    try {
      const nota = await Nota.findById(id);
      if (!nota) {
        return res.status(404).json({
          ok: false,
          msg: 'Nota no existe por ese id',
        });
      }
      nota.isFiled = !isFiled;
      const notaGuardada = await nota.save();
      res.json({
        ok: true,
        nota: notaGuardada,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
      });
    }
};

module.exports = {
    getNotas,
    crearNota,
    actualizarNota,
    eliminarNota,
    archivarNota
}


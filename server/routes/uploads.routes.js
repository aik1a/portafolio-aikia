import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import multer from 'multer';
import { getFileExtension, validateFile, validateFileMetadata } from '../utils/validateFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'data', 'uploads');

const storage = multer.diskStorage({
  destination: uploadDir,
  filename(_req, file, callback) {
    callback(null, `${randomUUID()}${getFileExtension(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, callback) {
    const validation = validateFileMetadata(file);
    callback(validation.ok ? null : new Error(validation.error), validation.ok);
  },
});

const router = express.Router();

router.post('/', upload.single('file'), (req, res) => {
  const validation = validateFile(req.file);
  if (!validation.ok) {
    res.status(400).json({ error: validation.error });
    return;
  }

  res.json({
    attachment: {
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
    },
  });
});

router.use((error, _req, res, next) => {
  void next;

  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    res.status(400).json({ error: 'El archivo supera el maximo de 5 MB.' });
    return;
  }

  res.status(400).json({ error: error.message || 'Archivo no permitido.' });
});

export default router;

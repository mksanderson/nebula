import { Request, Response } from 'express';
import { pool } from '../config/database';

export async function getApps(req: Request, res: Response) {
  const result = await pool.query('SELECT * FROM apps WHERE approved = true');
  res.json(result.rows);
}

export async function addApp(req: Request, res: Response) {
  const { name, link, title, description } = req.body;
  const userId = (req as any).userId;
  await pool.query(
    'INSERT INTO apps (name, link, title, description, user_id, approved) VALUES ($1, $2, $3, $4, $5, false)',
    [name, link, title, description, userId]
  );
  res.status(201).json({ message: 'App submitted for approval' });
}

export async function approveApp(req: Request, res: Response) {
  const id = req.params.id;
  await pool.query('UPDATE apps SET approved = true WHERE id = $1', [id]);
  res.json({ message: 'App approved' });
}

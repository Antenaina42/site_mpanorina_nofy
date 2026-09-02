import mysql from 'mysql2/promise';
import { projects as defaultProjects, type Project } from '@/data/projects';

// Database configuration with environment variables and sensible WAMP defaults
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'mpanorina_nofy',
  port: Number(process.env.MYSQL_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;
let isInitialized = false;

// Fallback in-memory store in case MySQL is offline
let memoryStore: Project[] = [...defaultProjects];

export async function getDbPool(): Promise<mysql.Pool | null> {
  if (pool) return pool;

  try {
    // First, connect without database to ensure DB exists
    const rootConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
    });

    await rootConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await rootConnection.end();

    // Now create pool with database
    pool = mysql.createPool(dbConfig);
    return pool;
  } catch (error) {
    console.warn('[DB] MySQL connection failed. Using in-memory fallback store:', error);
    return null;
  }
}

export async function initDatabase(): Promise<boolean> {
  if (isInitialized) return true;

  try {
    const currentPool = await getDbPool();
    if (!currentPool) return false;

    // Create projects table if not exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        year VARCHAR(20) NOT NULL,
        description TEXT NOT NULL,
        long_description LONGTEXT NOT NULL,
        main_image TEXT NOT NULL,
        images JSON,
        surface VARCHAR(100),
        duration VARCHAR(100),
        type VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await currentPool.query(createTableQuery);

    // Check if table is empty to seed initial default projects
    const [rows]: any = await currentPool.query('SELECT COUNT(*) as count FROM projects');
    if (rows[0]?.count === 0) {
      console.log('[DB] Seeding default projects into MySQL...');
      for (const p of defaultProjects) {
        await currentPool.query(
          `INSERT INTO projects 
           (slug, title, location, category, year, description, long_description, main_image, images, surface, duration, type) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            p.slug,
            p.title,
            p.location,
            p.category,
            p.year,
            p.description,
            p.longDescription,
            p.mainImage,
            JSON.stringify(p.images || []),
            p.details?.surface || '',
            p.details?.duration || '',
            p.details?.type || '',
          ]
        );
      }
    }

    isInitialized = true;
    return true;
  } catch (error) {
    console.warn('[DB] Error initializing database tables:', error);
    return false;
  }
}

// Convert DB row to Project object
export function mapRowToProject(row: any): Project {
  let images: string[] = [];
  try {
    if (typeof row.images === 'string') {
      images = JSON.parse(row.images);
    } else if (Array.isArray(row.images)) {
      images = row.images;
    }
  } catch (e) {
    images = [row.main_image];
  }

  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    location: row.location,
    category: row.category,
    year: row.year,
    description: row.description,
    longDescription: row.long_description || row.description,
    mainImage: row.main_image,
    images: images.length > 0 ? images : [row.main_image],
    details: {
      surface: row.surface || undefined,
      duration: row.duration || undefined,
      type: row.type || undefined,
    },
  };
}

// Database helper operations
export async function getAllProjectsFromDb(): Promise<{ projects: Project[]; isDbConnected: boolean }> {
  try {
    await initDatabase();
    const currentPool = await getDbPool();

    if (currentPool) {
      const [rows]: any = await currentPool.query('SELECT * FROM projects ORDER BY id DESC');
      const mapped = rows.map(mapRowToProject);
      return { projects: mapped, isDbConnected: true };
    }
  } catch (error) {
    console.warn('[DB] Query error in getAllProjectsFromDb:', error);
  }

  return { projects: memoryStore, isDbConnected: false };
}

export async function getProjectBySlugFromDb(slug: string): Promise<Project | null> {
  try {
    await initDatabase();
    const currentPool = await getDbPool();

    if (currentPool) {
      const [rows]: any = await currentPool.query('SELECT * FROM projects WHERE slug = ? LIMIT 1', [slug]);
      if (rows.length > 0) {
        return mapRowToProject(rows[0]);
      }
    }
  } catch (error) {
    console.warn('[DB] Query error in getProjectBySlugFromDb:', error);
  }

  return memoryStore.find((p) => p.slug === slug) || null;
}

export async function getProjectByIdFromDb(id: string): Promise<Project | null> {
  try {
    await initDatabase();
    const currentPool = await getDbPool();

    if (currentPool) {
      const [rows]: any = await currentPool.query('SELECT * FROM projects WHERE id = ? LIMIT 1', [id]);
      if (rows.length > 0) {
        return mapRowToProject(rows[0]);
      }
    }
  } catch (error) {
    console.warn('[DB] Query error in getProjectByIdFromDb:', error);
  }

  return memoryStore.find((p) => p.id === id) || null;
}

export async function createProjectInDb(data: Omit<Project, 'id'>): Promise<Project> {
  try {
    await initDatabase();
    const currentPool = await getDbPool();

    if (currentPool) {
      const [result]: any = await currentPool.query(
        `INSERT INTO projects 
         (slug, title, location, category, year, description, long_description, main_image, images, surface, duration, type) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.slug,
          data.title,
          data.location,
          data.category,
          data.year,
          data.description,
          data.longDescription,
          data.mainImage,
          JSON.stringify(data.images || [data.mainImage]),
          data.details?.surface || '',
          data.details?.duration || '',
          data.details?.type || '',
        ]
      );

      return {
        id: String(result.insertId),
        ...data,
      };
    }
  } catch (error) {
    console.warn('[DB] Insert error in createProjectInDb:', error);
  }

  const newProject: Project = {
    id: String(Date.now()),
    ...data,
  };
  memoryStore.unshift(newProject);
  return newProject;
}

export async function updateProjectInDb(id: string, data: Partial<Project>): Promise<Project | null> {
  try {
    await initDatabase();
    const currentPool = await getDbPool();

    if (currentPool) {
      const updates: string[] = [];
      const values: any[] = [];

      if (data.title !== undefined) { updates.push('title = ?'); values.push(data.title); }
      if (data.slug !== undefined) { updates.push('slug = ?'); values.push(data.slug); }
      if (data.location !== undefined) { updates.push('location = ?'); values.push(data.location); }
      if (data.category !== undefined) { updates.push('category = ?'); values.push(data.category); }
      if (data.year !== undefined) { updates.push('year = ?'); values.push(data.year); }
      if (data.description !== undefined) { updates.push('description = ?'); values.push(data.description); }
      if (data.longDescription !== undefined) { updates.push('long_description = ?'); values.push(data.longDescription); }
      if (data.mainImage !== undefined) { updates.push('main_image = ?'); values.push(data.mainImage); }
      if (data.images !== undefined) { updates.push('images = ?'); values.push(JSON.stringify(data.images)); }
      if (data.details?.surface !== undefined) { updates.push('surface = ?'); values.push(data.details.surface); }
      if (data.details?.duration !== undefined) { updates.push('duration = ?'); values.push(data.details.duration); }
      if (data.details?.type !== undefined) { updates.push('type = ?'); values.push(data.details.type); }

      if (updates.length > 0) {
        values.push(id);
        await currentPool.query(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`, values);
        return getProjectByIdFromDb(id);
      }
    }
  } catch (error) {
    console.warn('[DB] Update error in updateProjectInDb:', error);
  }

  const index = memoryStore.findIndex((p) => p.id === id);
  if (index !== -1) {
    memoryStore[index] = { ...memoryStore[index], ...data };
    return memoryStore[index];
  }
  return null;
}

export async function deleteProjectFromDb(id: string): Promise<boolean> {
  let dbDeleted = false;

  try {
    await initDatabase();
    const currentPool = await getDbPool();

    if (currentPool) {
      const [result]: any = await currentPool.query(
        'DELETE FROM projects WHERE id = ? OR slug = ?',
        [id, id]
      );
      dbDeleted = result.affectedRows > 0;
    }
  } catch (error) {
    console.warn('[DB] Delete error in deleteProjectFromDb:', error);
  }

  // Also remove from in-memory fallback store
  const initialCount = memoryStore.length;
  memoryStore = memoryStore.filter(
    (p) => String(p.id) !== String(id) && p.slug !== id
  );
  const memoryDeleted = memoryStore.length < initialCount;

  return dbDeleted || memoryDeleted || true;
}

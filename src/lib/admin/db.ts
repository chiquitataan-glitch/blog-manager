import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const defaultDatabasePath = path.join(process.cwd(), "data", "99blog.sqlite");
const databasePath = process.env.BLOG_DB_PATH ?? defaultDatabasePath;

let database: Database.Database | undefined;

function ensureDatabaseDirectory() {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
}

function initializeDatabase(db: Database.Database) {
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      alias TEXT NOT NULL,
      headline TEXT NOT NULL,
      description TEXT NOT NULL,
      avatar TEXT NOT NULL,
      cta TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      value TEXT NOT NULL,
      href TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL,
      cover TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_assets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_name TEXT NOT NULL,
      public_path TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      intro TEXT NOT NULL,
      problem TEXT NOT NULL,
      target_users TEXT NOT NULL,
      value TEXT NOT NULL,
      outcome TEXT NOT NULL,
      tech_stack TEXT NOT NULL,
      status TEXT NOT NULL,
      stage TEXT NOT NULL,
      released_at TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      media TEXT NOT NULL,
      links TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      organization TEXT NOT NULL,
      period TEXT NOT NULL,
      summary TEXT NOT NULL,
      highlights TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL
    );
  `);
}

export function getAdminDb() {
  if (!database) {
    ensureDatabaseDirectory();
    database = new Database(databasePath);
    initializeDatabase(database);
  }

  return database;
}

export function getAdminDatabasePath() {
  return databasePath;
}

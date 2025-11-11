import session from "express-session";
import SQLiteStoreFactory from "connect-sqlite3";

const SQLiteStore = SQLiteStoreFactory(session);

export function makeSession() {
  return session({
    store: new SQLiteStore({
      db: "sessions.sqlite",
      dir: "."
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  });
}

export function requireAdmin(req, res, next) {
  if (req.session?.user?.role === "admin") return next();
  return res.status(401).json({ error: "Admin only" });
}

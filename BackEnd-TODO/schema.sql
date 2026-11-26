CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY,
    title       TEXT NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 100),
    description TEXT NOT NULL DEFAULT '' CHECK (length(description) <= 500),
    category    TEXT NOT NULL CHECK (category IN ('study', 'project', 'personal')),
    priority    TEXT NOT NULL CHECK (priority IN ('low', 'normal', 'high')),
    due_date    TEXT CHECK (due_date IS NULL OR
        (length(due_date) = 10 AND date(due_date) IS NOT NULL AND date(due_date) = due_date)),
    status      TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'doing', 'done')),
    created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
) STRICT;

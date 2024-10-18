var dbm;
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db, callback) {
    db.runSql(`
        -- Create roles table
        CREATE TABLE IF NOT EXISTS public.roles
        (
            id SERIAL PRIMARY KEY UNIQUE,
            admin JSONB,
            advertising JSONB,
            movies JSONB,
            roles JSONB,
            series JSONB,
            statistics JSONB,
            uploads JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        );

        -- Create admin table
        CREATE TABLE IF NOT EXISTS public.admin
        (
            id SERIAL PRIMARY KEY UNIQUE,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            role_id INTEGER UNIQUE REFERENCES public.roles(id),
            language VARCHAR(255),
            boss_admin BOOLEAN,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        );

        -- Create movies table
        CREATE TABLE IF NOT EXISTS public.movies
        (
            id SERIAL PRIMARY KEY UNIQUE,
            code INTEGER,
            name JSONB,
            url JSONB,
            quality VARCHAR(255),
            duration VARCHAR(255),
            state VARCHAR(255),
            year VARCHAR(255),
            genre VARCHAR(255),
            create_admin_id INTEGER REFERENCES public.admin(id),
            seen INTEGER DEFAULT 0,
            movie_type VARCHAR(255) DEFAULT 'movie',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        );

        -- Create statistics table (renamed from users)
        CREATE TABLE IF NOT EXISTS public.statistics
        (
            id SERIAL PRIMARY KEY UNIQUE,
            watched INTEGER DEFAULT 0,
            exits INTEGER DEFAULT 0,
            not_exited INTEGER DEFAULT 0,
            month VARCHAR(255),
            type VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        );

        -- Create advertising table
        CREATE TABLE IF NOT EXISTS public.advertising
        (
            id SERIAL PRIMARY KEY UNIQUE,
            upload_id INTEGER,
            seen INTEGER DEFAULT 0,
            finish INTEGER,
            create_admin_id INTEGER REFERENCES public.admin(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        );

        -- Create series table
        CREATE TABLE IF NOT EXISTS public.series
        (
            id SERIAL PRIMARY KEY UNIQUE,
            name JSONB,
            movies INTEGER[],   -- Array to store multiple movie IDs
            state VARCHAR(255),
            year VARCHAR(255),
            genre VARCHAR(255),
            code INTEGER UNIQUE,
            seen INTEGER DEFAULT 0,
            create_admin_id INTEGER REFERENCES public.admin(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        );
          -- Create uploads table
        CREATE TABLE IF NOT EXISTS public.uploads
        (
            id SERIAL PRIMARY KEY UNIQUE,
            url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP DEFAULT NULL
        );
    `, function (err) {
        if (err) return callback(err);
        callback();
    });
};

exports.down = function (db, callback) {
    db.runSql(`
        -- Drop tables in reverse order of creation to handle dependencies
        DROP TABLE IF EXISTS public.series;
        DROP TABLE IF EXISTS public.advertising;
        DROP TABLE IF EXISTS public.uploads;
        DROP TABLE IF EXISTS public.movies;
        DROP TABLE IF EXISTS public.admin;
        DROP TABLE IF EXISTS public.roles;
        DROP TABLE IF EXISTS public.statistics;
        DROP TABLE IF EXISTS public.uploads;
    `, function (err) {
        if (err) return callback(err);
        callback();
    });
};

exports._meta = {
    "version": 1
};

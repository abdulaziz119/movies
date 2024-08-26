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
            movies JSONB,
            users JSONB,
            admin JSONB
        );

        -- Create admin table
        CREATE TABLE IF NOT EXISTS public.admin
        (
            id SERIAL PRIMARY KEY UNIQUE,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            language VARCHAR(255),
            role_id INTEGER UNIQUE REFERENCES public.roles(id),
            boss_admin BOOLEAN,
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255)
        );

        -- Create movies table
        CREATE TABLE IF NOT EXISTS public.movies
        (
            id SERIAL PRIMARY KEY UNIQUE,
            code INTEGER,
            name JSONB,
            language JSONB,
            quality VARCHAR(255),
            duration VARCHAR(255),
            state VARCHAR(255),
            year VARCHAR(255),
            genre VARCHAR(255),
            create_admin_id INTEGER REFERENCES public.admin(id),
            seen INTEGER
        );

        -- Create uploads table
        CREATE TABLE IF NOT EXISTS public.uploads
        (
            id SERIAL PRIMARY KEY UNIQUE,
            url VARCHAR(255),
            movie_id INTEGER REFERENCES public.movies(id)
        );

        -- Create statistics table (renamed from users)
        CREATE TABLE IF NOT EXISTS public.statistics
        (
            id SERIAL PRIMARY KEY UNIQUE,
            watched INTEGER,
            exits INTEGER,
            not_exited INTEGER,
            month INTEGER,
            type VARCHAR(255)
        );
    `, function (err) {
        if (err) return callback(err);
        callback();
    });
};

exports.down = function (db, callback) {
    db.runSql(`
        -- Drop tables in reverse order of creation to handle dependencies
        DROP TABLE IF EXISTS public.uploads;
        DROP TABLE IF EXISTS public.movies;
        DROP TABLE IF EXISTS public.admin;
        DROP TABLE IF EXISTS public.roles;
        DROP TABLE IF EXISTS public.statistics;
    `, function (err) {
        if (err) return callback(err);
        callback();
    });
};

exports._meta = {
    "version": 1
};

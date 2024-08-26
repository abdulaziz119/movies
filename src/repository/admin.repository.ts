import {AdminModel, pgPoolQuery, QueryParams} from '..';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed and imported


export class AdminsRepository {

    static async create(params: AdminModel): Promise<AdminModel> {
        const sql = `
            INSERT INTO public.admin (first_name, last_name, role_id, boss_admin, email, password)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        // Set default value for boss_admin if not provided
        const bossAdmin = params.boss_admin !== undefined ? params.boss_admin : false;

        const values = [
            params.first_name,
            params.last_name,
            params.role_id,
            bossAdmin,
            params.email,
            params.password
        ];

        const result = await pgPoolQuery(sql, values);

        // Check if the result has rows
        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0];
    }


    static async login(params: { email: string, password: string }): Promise<AdminModel | null> {
        const sql = `
            SELECT * FROM public.admin
            WHERE email = $1;
        `;

        const result = await pgPoolQuery(sql, [params.email]);

        if (!result.rows || result.rows.length === 0) {
            return null;
        }

        const admin = result.rows[0];

        const isPasswordValid = await  this.comparePasswords(params.password, admin.password);

        if (!isPasswordValid) {
            return null;
        }

        return admin;
    }

     static  comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

}

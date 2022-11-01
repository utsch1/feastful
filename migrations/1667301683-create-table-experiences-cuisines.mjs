export async function up(sql) {
  await sql`
    CREATE TABLE experiences_cuisines (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      cuisine_id integer REFERENCES cuisines (id) ON DELETE CASCADE,
      experience_id integer REFERENCES experiences (id)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE experiences_cuisines
  `;
}

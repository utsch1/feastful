export async function up(sql) {
  await sql`
    CREATE TABLE photos (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      photo_url varchar(110) NOT NULL,
      experiences_id integer REFERENCES experiences (id) ON DELETE CASCADE NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE photos
  `;
}

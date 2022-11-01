export async function up(sql) {
  await sql`
    CREATE TABLE photos (
      id integer PRIMARY KEY,
      photo_url varchar(110) NOT NULL,
      experiences_id integer REFERENCES experiences (id) NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE photos
  `;
}

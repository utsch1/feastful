export async function up(sql) {
  await sql`
    CREATE TABLE personalInformation (
      id integer PRIMARY KEY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      first_name varchar(20) NOT NULL,
      personal_information text,
      photo_id integer REFERENCES photos (id)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE personalInformation
  `;
}

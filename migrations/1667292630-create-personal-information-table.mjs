export async function up(sql) {
  await sql`
    CREATE TABLE personalInformation (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      first_name varchar(40) NOT NULL,
      personal_information varchar(500) NOT NULL,
      photo_url varchar(110)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE personalInformation
  `;
}

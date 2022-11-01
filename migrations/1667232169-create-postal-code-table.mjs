export async function up(sql) {
  await sql`
    CREATE TABLE postalCodes (
      id integer PRIMARY KEY,
      postal_code integer NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE postalCodes
  `;
}

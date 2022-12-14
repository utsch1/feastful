export async function up(sql) {
  await sql`
    CREATE TABLE languages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      language varchar(20) NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE languages
  `;
}

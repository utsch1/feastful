export async function up(sql) {
  await sql`
    CREATE TABLE cuisines (
      id integer PRIMARY KEY,
      cuisine varchar(30) NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE cuisines
  `;
}

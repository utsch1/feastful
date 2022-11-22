export async function up(sql) {
  await sql`
    CREATE TABLE experiences (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE NOT NULL ,
      headline varchar(70) NOT NULL,
      description varchar(500) NOT NULL,
      cuisine_id integer REFERENCES cuisines (id) NOT NULL,
      languages_id integer REFERENCES languages (id) NOT NULL,
      postal_code_id integer REFERENCES postalCodes (id) NOT NULL,
      price integer NOT NULL,
      created_at timestamp NOT NULL DEFAULT NOW(),
      event_date timestamp NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE experiences
  `;
}

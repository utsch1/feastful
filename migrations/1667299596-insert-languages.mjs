const languages = [
  { id: 1, language: 'English' },
  { id: 2, language: 'German' },
  { id: 3, language: 'French' },
  { id: 4, language: 'Spanish' },
  { id: 5, language: 'Italian' },
  { id: 6, language: 'Chinese' },
  { id: 7, language: 'Polish' },
  { id: 8, language: 'Japanese' },
];

export async function up(sql) {
  await sql`
    INSERT INTO languages ${sql(languages, 'id', 'language')}
  `;
}

export async function down(sql) {
  for (const language of languages) {
    await sql`
      DELETE FROM
      languages
      WHERE
        id = ${language.id}
      AND
      language = ${language.postal_code}
    `;
  }
}

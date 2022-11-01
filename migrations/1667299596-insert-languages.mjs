const languages = [
  { language: 'English' },
  { language: 'German' },
  { language: 'French' },
  { language: 'Spanish' },
  { language: 'Italian' },
  { language: 'Chinese' },
  { language: 'Polish' },
  { language: 'Japanese' },
];

export async function up(sql) {
  await sql`
    INSERT INTO languages ${sql(languages, 'language')}
  `;
}

export async function down(sql) {
  for (const language of languages) {
    await sql`
      DELETE FROM
      languages
      WHERE
      language = ${language.language}
    `;
  }
}

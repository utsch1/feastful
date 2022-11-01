const cuisines = [
  { cuisine: 'Austrian' },
  { cuisine: 'Chinese' },
  { cuisine: 'Japanese' },
  { cuisine: 'Korean' },
  { cuisine: 'Indian' },
  { cuisine: 'Italian' },
  { cuisine: 'Mexican' },
  { cuisine: 'Peruvian' },
  { cuisine: 'French' },
  { cuisine: 'Spanish' },
  { cuisine: 'Taiwanese' },
  { cuisine: 'Malaysian' },
  { cuisine: 'Arabian' },
  { cuisine: 'Thai' },
  { cuisine: 'Afghan' },
  { cuisine: 'Sri Lankan' },
  { cuisine: 'North African' },
  { cuisine: 'Vietnamese' },
  { cuisine: 'Balkan' },
  { cuisine: 'Levantine' },
  { cuisine: 'Caucasian' },
  { cuisine: 'Polish' },
  { cuisine: 'Greek' },
  { cuisine: 'Vegan' },
  { cuisine: 'Vegetarian' },
  { cuisine: 'Fusion' },
];

export async function up(sql) {
  await sql`
    INSERT INTO cuisines ${sql(cuisines, 'cuisine')}
  `;
}

export async function down(sql) {
  for (const cuisine of cuisines) {
    await sql`
      DELETE FROM
        cuisines
      WHERE
        cuisine = ${cuisine.cuisine}
    `;
  }
}

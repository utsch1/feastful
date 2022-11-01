const cuisines = [
  { id: 1, cuisine: 'Austrian' },
  { id: 2, cuisine: 'Chinese' },
  { id: 3, cuisine: 'Japanese' },
  { id: 4, cuisine: 'Korean' },
  { id: 5, cuisine: 'Indian' },
  { id: 6, cuisine: 'Italian' },
  { id: 7, cuisine: 'Mexican' },
  { id: 8, cuisine: 'Peruvian' },
  { id: 9, cuisine: 'French' },
  { id: 10, cuisine: 'Spanish' },
  { id: 11, cuisine: 'Taiwanese' },
  { id: 12, cuisine: 'Malaysian' },
  { id: 13, cuisine: 'Arabian' },
  { id: 14, cuisine: 'Thai' },
  { id: 15, cuisine: 'Afghan' },
  { id: 16, cuisine: 'Sri Lankan' },
  { id: 17, cuisine: 'North African' },
  { id: 18, cuisine: 'Vietnamese' },
  { id: 19, cuisine: 'Balkan' },
  { id: 20, cuisine: 'Levantine' },
  { id: 21, cuisine: 'Caucasian' },
  { id: 22, cuisine: 'Polish' },
  { id: 23, cuisine: 'Greek' },
  { id: 24, cuisine: 'Vegan' },
  { id: 25, cuisine: 'Vegetarian' },
  { id: 26, cuisine: 'Fusion' },
];

export async function up(sql) {
  await sql`
    INSERT INTO cuisines ${sql(cuisines, 'id', 'cuisine')}
  `;
}

export async function down(sql) {
  for (const cuisine of cuisines) {
    await sql`
      DELETE FROM
        cuisines
      WHERE
        id = ${cuisine.id}
      AND
        cuisine = ${cuisine.cuisine}
    `;
  }
}

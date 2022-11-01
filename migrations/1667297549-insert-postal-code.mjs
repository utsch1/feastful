const postalCodes = [
  { id: 1, postal_code: '1010' },
  { id: 2, postal_code: '1020' },
  { id: 3, postal_code: '1030' },
  { id: 4, postal_code: '1040' },
  { id: 5, postal_code: '1050' },
  { id: 6, postal_code: '1060' },
  { id: 7, postal_code: '1070' },
  { id: 8, postal_code: '1080' },
  { id: 9, postal_code: '1090' },
  { id: 10, postal_code: '1100' },
  { id: 11, postal_code: '1110' },
  { id: 12, postal_code: '1120' },
  { id: 13, postal_code: '1130' },
  { id: 14, postal_code: '1140' },
  { id: 15, postal_code: '1150' },
  { id: 16, postal_code: '1160' },
  { id: 17, postal_code: '1170' },
  { id: 18, postal_code: '1180' },
  { id: 19, postal_code: '1190' },
  { id: 20, postal_code: '1200' },
  { id: 21, postal_code: '1210' },
  { id: 22, postal_code: '1220' },
  { id: 23, postal_code: '1230' },
];

export async function up(sql) {
  await sql`
    INSERT INTO postalCodes ${sql(postalCodes, 'id', 'postal_code')}
  `;
}

export async function down(sql) {
  for (const postalCode of postalCodes) {
    await sql`
      DELETE FROM
        postalCodes
      WHERE
        id = ${postalCode.id}
      AND
        postal_code = ${postalCode.postal_code}
    `;
  }
}

const postalCodes = [
  {  postal_code: '1010' },
  {  postal_code: '1020' },
  {  postal_code: '1030' },
  {  postal_code: '1040' },
  {  postal_code: '1050' },
  {  postal_code: '1060' },
  {  postal_code: '1070' },
  {  postal_code: '1080' },
  {  postal_code: '1090' },
  {  postal_code: '1100' },
  {  postal_code: '1110' },
  {  postal_code: '1120' },
  {  postal_code: '1130' },
  {  postal_code: '1140' },
  {  postal_code: '1150' },
  {  postal_code: '1160' },
  {  postal_code: '1170' },
  {  postal_code: '1180' },
  {  postal_code: '1190' },
  {  postal_code: '1200' },
  {  postal_code: '1210' },
  {  postal_code: '1220' },
  {  postal_code: '1230' },
];

export async function up(sql) {
  await sql`
    INSERT INTO postalCodes ${sql(postalCodes, 'postal_code')}
  `;
}

export async function down(sql) {
  for (const postalCode of postalCodes) {
    await sql`
      DELETE FROM
        postalCodes
      WHERE
        postal_code = ${postalCode.postal_code}
    `;
  }
}

// require("dotenv").config();
// const { google } = require("googleapis");
// console.log(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS));
// const credentials = "";

// const auth = new google.auth.GoogleAuth({
//   credentials,
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"]
// });

// const range = "Sheet1!A1";

// async function appendToSheet(values, spreadsheetId) {
//   const sheets = google.sheets({ version: "v4", auth });
//   const valueInputOption = "USER_ENTERED";

//   const resource = { values };

//   try {
//     const res = await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range,
//       valueInputOption,
//       resource
//     });
//     return res;
//   } catch (error) {
//     console.error("Error appending to sheet:", error.message);
//     throw error;
//   }
// }

// async function checkAndWriteHeaders(headerValues, spreadsheetId) {
//   const sheets = google.sheets({ version: "v4", auth });

//   try {
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "Sheet1!A1:W1"
//     });

//     const rows = response.data.values;
//     if (!rows || rows.length === 0 || rows[0].length !== headerValues.length) {
//       await sheets.spreadsheets.values.update({
//         spreadsheetId,
//         range,
//         valueInputOption: "RAW",
//         resource: {
//           values: [headerValues]
//         }
//       });
//     }
//   } catch (error) {
//     console.error("Error checking/writing headers:", error);
//     throw error;
//   }
// }

// module.exports = { checkAndWriteHeaders, appendToSheet };

const { google } = require("googleapis");

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);
// const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});
console.log(2);
const spreadsheetId = "1wchsToFbIfnar4M99bYS41ITJwNbVeIn5_Bfkkmxy-M";
const range = "Sheet1!A1";

async function appendToSheet(values) {
  const sheets = google.sheets({ version: "v4", auth });
  const valueInputOption = "USER_ENTERED";

  const resource = { values };

  try {
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource
    });
    return res;
  } catch (error) {
    console.error("Error appending to sheet:", error);
    throw error;
  }
}

async function checkAndWriteHeaders(headerValues) {
  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A1:W1"
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0 || rows[0].length !== headerValues.length) {
      // Headers are missing or incorrect, write them
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: {
          values: [headerValues]
        }
      });
    }
  } catch (error) {
    console.error("Error checking/writing headers:", error);
    throw error;
  }
}

module.exports = { checkAndWriteHeaders, appendToSheet };

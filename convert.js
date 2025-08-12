import fs from "fs";
import Papa from "papaparse";

// Ensure data folder exists
if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}

const csvFile = fs.readFileSync("./data/complaints.csv", "utf8");

Papa.parse(csvFile, {
  header: true,
  skipEmptyLines: true,
  complete: (result) => {
    const map = {};
    const issues = [];
    const complaints = [];

    result.data.forEach((row) => {
      const type = row["Complaint Types"]?.trim();
      if (!type) return;

      Object.keys(row).forEach((col) => {
        if (col === "Complaint Types" || col === "S No.") return;

        const cell = row[col]?.trim();
        if (cell && cell !== "-") {
          const keyword = cell.toLowerCase();
          map[keyword] = type;
          issues.push(keyword);
          complaints.push(type);
        }
      });
    });

    fs.writeFileSync(
      "./data/complaintMap.js",
      `export const complaintMap = ${JSON.stringify(map, null, 2)};
export const issues = ${JSON.stringify(issues, null, 2)};
export const complaints = ${JSON.stringify([...new Set(complaints)], null, 2)};
`
    );

    console.log(`✅ complaintMap.js generated with ${issues.length} issues & ${new Set(complaints).size} unique complaints`);
  }
});

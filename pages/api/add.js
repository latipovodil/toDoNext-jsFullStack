import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const send = {
      title: data.title,
      text: data.text,
      id: Math.round(Math.random() * 1000000),
    };
    const notes = JSON.parse(fs.readFileSync("notes.json", "utf8"));
    fs.writeFile(
      "notes.json",
      JSON.stringify([...notes, send], null, 4),
      (err) => {
        console.log(err);
      }
    );

    if (data.title && data.text) {
      res.status(200).json({
        message: "Ma'lumot qabul qilindi!",
        data: send,
      });
    } else {
      res
        .status(405)
        .json({ message: "Title yoki text jo'natilmadi", error: true });
    }
  } else {
    res
      .status(405)
      .json({ message: "Faqat POST so'rovlari qabul qilinadi", error: true });
  }
}

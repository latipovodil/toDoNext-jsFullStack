import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const notes = JSON.parse(fs.readFileSync("notes.json", "utf8"));
    const sendData = notes.filter((el) => {
      if (el.id == data.id) {
        return;
      }
      return el;
    });

    if (data.id) {
      fs.writeFile("notes.json", JSON.stringify(sendData, null, 4), (err) => {
        console.log(err);
      });
      res.status(200).json({
        message: "Ma'lumot o'chirib tashlandi!",
      });
    } else {
      res.status(405).json({ message: "Id jo'natilmadi", error: true });
    }
  } else {
    res
      .status(405)
      .json({ message: "Faqat POST so'rovlari qabul qilinadi", error: true });
  }
}

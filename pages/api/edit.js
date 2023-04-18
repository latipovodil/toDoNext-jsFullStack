import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const send = {
      title: data.title,
      text: data.text,
      id: data.id,
    };

    const notes = JSON.parse(fs.readFileSync("notes.json", "utf8"));

    if (data.title && data.text && data.id) {

      const sendData = notes.filter((el)=> {
        if (el.id == send.id) {
          el.title = send.title,
          el.text = send.text
          return el
        }
        return el
      })

      fs.writeFile(
        "notes.json",
        JSON.stringify(sendData, null, 4),
        (err) => {
          console.log(err);
        }
      );

      res.status(200).json({
        message: "Ma'lumot muvaffaqqiyatli o'zgartirildi!",
        data: send,
      });
    } else {
      res
        .status(405)
        .json({ message: "Title,id yoki text jo'natilmadi", error: true });
    }
  } else {
    res
      .status(405)
      .json({ message: "Faqat POST so'rovlari qabul qilinadi", error: true });
  }
}

import NextCors from "nextjs-cors";
import sanityClient from '../../lib/client';

export default async (req, res) => {

  const doc = req.body;
  console.log('DOC:' + doc);

  try {
    const result = await sanityClient.create(doc);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ error: (e).message });
  }
};
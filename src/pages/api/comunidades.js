import { SiteClient } from "datocms-client";

export default async function receberDeRequests(req, res) {

  if (req.method === 'POST') {
    const TOKEN = "3427c2c32f93be11676b765abccb87";

    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
      itemType: "959717",
      ...req.body
    });

    return res.send({
      data: registroCriado,
    });
  }

  res.status(400).json({
    mensagem: 'Ainda não temos nada no GET'
  })
}

import { SiteClient } from 'datocms-client';

export default async function requestsReceiver(req, res) {
  if (req.method === 'POST') {
    const TOKEN = '111686406a72b63e4d04f4b10f5ab8';
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
      itemType: '980922',
      ...req.body,
    });

    return res.json({
      registroCriado,
    });
  }

  return res
    .status(404)
    .json({ message: 'Método GET não encontrado, tente o POST' });
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { accountantValidationSchema } from 'validationSchema/accountants';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.accountant
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAccountantById();
    case 'PUT':
      return updateAccountantById();
    case 'DELETE':
      return deleteAccountantById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAccountantById() {
    const data = await prisma.accountant.findFirst(convertQueryToPrismaUtil(req.query, 'accountant'));
    return res.status(200).json(data);
  }

  async function updateAccountantById() {
    await accountantValidationSchema.validate(req.body);
    const data = await prisma.accountant.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAccountantById() {
    const data = await prisma.accountant.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

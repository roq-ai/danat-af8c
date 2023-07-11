import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { customerServiceRepresentativeValidationSchema } from 'validationSchema/customer-service-representatives';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCustomerServiceRepresentatives();
    case 'POST':
      return createCustomerServiceRepresentative();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCustomerServiceRepresentatives() {
    const data = await prisma.customer_service_representative
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'customer_service_representative'));
    return res.status(200).json(data);
  }

  async function createCustomerServiceRepresentative() {
    await customerServiceRepresentativeValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.customer_service_representative.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

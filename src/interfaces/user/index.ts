import { AccountantInterface } from 'interfaces/accountant';
import { CustomerServiceRepresentativeInterface } from 'interfaces/customer-service-representative';
import { EndCustomerInterface } from 'interfaces/end-customer';
import { TeamMemberInterface } from 'interfaces/team-member';

import { GetQueryInterface } from '../get-query.interface';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roq_user_id: string;
  tenant_id: string;

  accountant: AccountantInterface[];
  customer_service_representative: CustomerServiceRepresentativeInterface[];
  end_customer: EndCustomerInterface[];
  team_member: TeamMemberInterface[];
}

export interface UserGetQueryInterface extends GetQueryInterface {
  roq_user_id?: string;
  tenant_id?: string;
}

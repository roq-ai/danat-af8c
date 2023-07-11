import { AccountantInterface } from 'interfaces/accountant';
import { CustomerServiceRepresentativeInterface } from 'interfaces/customer-service-representative';
import { EndCustomerInterface } from 'interfaces/end-customer';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  accountant?: AccountantInterface[];
  customer_service_representative?: CustomerServiceRepresentativeInterface[];
  end_customer?: EndCustomerInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  _count?: {
    accountant?: number;
    customer_service_representative?: number;
    end_customer?: number;
    team_member?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}

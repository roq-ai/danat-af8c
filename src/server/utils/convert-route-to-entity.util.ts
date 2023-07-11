const mapping: Record<string, string> = {
  accountants: 'accountant',
  companies: 'company',
  'customer-service-representatives': 'customer_service_representative',
  'end-customers': 'end_customer',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

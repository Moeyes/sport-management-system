export interface Organization {
  id: string;
  type: 'province' | 'ministry' | string;
  name: string;
  khmerName?: string;
}
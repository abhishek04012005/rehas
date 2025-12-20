import EnquiryDashboard from '@/admin/enquiryDashboard/enquiryDashboard';

export const metadata = {
  title: 'Enquiry Dashboard | REHAS Admin',
  description: 'Manage and track service enquiries from your customers',
};

export default function EnquiriesPage() {
  return <EnquiryDashboard />;
}

import { Metadata } from 'next';
import CourseDetail from '@/components/courseDetail/courseDetail';

export const metadata: Metadata = {
  title: 'Auricular Therapy Program | Ear Acupuncture Training | REHAS',
  description:
    'Master auricular therapy and ear acupuncture. Professional certification in ear-based healing techniques for treating various health conditions.',
  keywords: [
    'Auricular Therapy',
    'Ear Acupuncture',
    'Auricular Acupuncture',
    'Ear Therapy',
    'Auricular Certification',
    'Ear Healing',
  ],
  openGraph: {
    title: 'Auricular Therapy Program | REHAS',
    description: 'Professional training in auricular therapy and ear acupuncture.',
    type: 'website',
  },
};

export default function AuricularTherapyCoursePage() {
  return (
    <CourseDetail
      courseName="Auricular Therapy Program"
      category="therapy"
      description="Discover ear acupuncture and auricular therapy for treating various health conditions"
      meaning="Auricular therapy, also known as ear acupuncture, is a therapeutic technique where specific points on the ear are stimulated to treat disease and promote wellness. The ear contains a microcosm of the entire body, with hundreds of reflexology and acupuncture points that correspond to different organs and systems. Our program teaches you to identify and treat these points effectively for pain relief, addiction recovery, stress management, and general health optimization."
      benefit="Master 200+ auricular points; Microsystem mapping knowledge; Effective pain and stress relief; Addiction treatment techniques; Quick relief modality; Easy portable practice capability"
      use="Professional auricular therapy practice; Pain management and addiction support; Quick stress relief sessions; Integration with other therapies; Workplace wellness programs; Clinical settings"
      price="₹6,000-₹12,000"
      duration="6-10 weeks"
      level="Intermediate"
      image="HearingOutlined"
      sessions={[
        {
          name: 'Weekend Intensive',
          duration: '2-3 weekends',
          description: 'Focused auricular point training with needle and non-needle techniques.',
          price: '₹6,000-₹9,000',
          includes: [
            'Ear anatomy study',
            'Auricular point location',
            'Needle technique practice',
            'Non-needle alternatives',
            'Professional certification',
          ],
        },
        {
          name: 'Weekly Classes',
          duration: '6-10 weeks',
          description: 'Comprehensive weekly training in auricular therapy theory and practice.',
          price: '₹8,000-₹11,000',
          includes: [
            'Complete auricular mapping',
            'Weekly practice sessions',
            'Needle and acupressure techniques',
            'Treatment for common conditions',
            'Clinical supervision',
            'Professional certification',
          ],
        },
        {
          name: 'Online Course',
          duration: 'Self-paced',
          description: 'Video-based auricular therapy learning with point charts.',
          price: '₹4,000-₹7,000',
          includes: [
            'Complete video modules',
            'Detailed ear point charts',
            'Treatment protocols',
            'Lifetime access',
            'Email support',
            'Digital certificate',
          ],
        },
        {
          name: 'Private Training',
          duration: 'Customized',
          description: 'One-on-one personalized auricular therapy training.',
          price: '₹1,200-₹2,000/hour',
          includes: [
            'Personal learning plan',
            'One-on-one mentoring',
            'Flexible schedule',
            'Hands-on practice',
            'Direct feedback',
            'Certification upon completion',
          ],
        },
      ]}
      curriculum={[
        {
          title: 'Module 1 - Ear Anatomy & Auricular Microsystem',
          description: 'Learn ear anatomy, the concept of the auricular microsystem, and how ear points correspond to the whole body.',
        },
        {
          title: 'Module 2 - 200+ Auricular Points & Zones',
          description: 'Master the location and function of all major auricular points and treatment zones.',
        },
        {
          title: 'Module 3 - Techniques & Treatment Protocols',
          description: 'Learn needle techniques, acupressure, and ear seeds for treating pain, stress, addiction, and health conditions.',
        },
        {
          title: 'Module 4 - Professional Practice & Safety',
          description: 'Develop treatment protocols, safety practices, client assessment, and business development for auricular practice.',
        },
      ]}
    />
  );
}

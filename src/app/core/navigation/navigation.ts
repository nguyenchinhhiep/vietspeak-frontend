import { NavigationItem } from 'src/app/components/navigation/navigation.model';

export const adminNavigation: NavigationItem[] = [
  {
    id: 'home',
    title: 'Home',
    translateKey: 'AdminNavigations.Home',
    type: 'basic',
    icon: 'mat_outline:home',
    link: '/admin/home',
    disabled: false,
  },
  {
    id: 'tutors',
    title: 'Tutors',
    translateKey: 'AdminNavigations.Tutors',
    type: 'basic',
    icon: 'mat_outline:portrait',
    link: '/admin/tutor',
    disabled: false,
  },
  {
    id: 'students',
    title: 'Students',
    translateKey: 'AdminNavigations.Students',
    type: 'basic',
    icon: 'mat_outline:portrait',
    link: '/admin/student',
    disabled: false,
  },
];

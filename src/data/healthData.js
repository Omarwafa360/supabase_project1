import { differenceInMonths, parseISO } from 'date-fns';

export const vaccinesData = [
  { id: 'BCG', name: 'لقاح السل (BCG)', ageMonths: 0 },
  { id: 'HepB1', name: 'التهاب الكبد ب (الجرعة الأولى)', ageMonths: 0 },
  { id: 'DTaP1', name: 'الثلاثي البكتيري (الجرعة الأولى)', ageMonths: 2 },
  { id: 'Hib1', name: 'المستدمية النزلية (الجرعة الأولى)', ageMonths: 2 },
  { id: 'Polio1', name: 'شلل الأطفال (الجرعة الأولى)', ageMonths: 2 },
  { id: 'PCV1', name: 'المكورات الرئوية (الجرعة الأولى)', ageMonths: 2 },
  { id: 'Rota1', name: 'الفيروس العجلي (الجرعة الأولى)', ageMonths: 2 },
  { id: 'DTaP2', name: 'الثلاثي البكتيري (الجرعة الثانية)', ageMonths: 4 },
  { id: 'Hib2', name: 'المستدمية النزلية (الجرعة الثانية)', ageMonths: 4 },
  { id: 'Polio2', name: 'شلل الأطفال (الجرعة الثانية)', ageMonths: 4 },
  { id: 'PCV2', name: 'المكورات الرئوية (الجرعة الثانية)', ageMonths: 4 },
  { id: 'Rota2', name: 'الفيروس العجلي (الجرعة الثانية)', ageMonths: 4 },
  { id: 'DTaP3', name: 'الثلاثي البكتيري (الجرعة الثالثة)', ageMonths: 6 },
  { id: 'Hib3', name: 'المستدمية النزلية (الجرعة الثالثة)', ageMonths: 6 },
  { id: 'Polio3', name: 'شلل الأطفال (الجرعة الثالثة)', ageMonths: 6 },
  { id: 'PCV3', name: 'المكورات الرئوية (الجرعة الثالثة)', ageMonths: 6 },
  { id: 'HepB2', name: 'التهاب الكبد ب (الجرعة الثانية)', ageMonths: 6 },
  { id: 'Flu1', name: 'الإنفلونزا (سنويًا)', ageMonths: 6 },
  { id: 'MMR1', name: 'الحصبة والنكاف والحصبة الألمانية (الجرعة الأولى)', ageMonths: 12 },
  { id: 'Varicella1', name: 'الجديري المائي (الجرعة الأولى)', ageMonths: 12 },
  { id: 'HepA1', name: 'التهاب الكبد أ (الجرعة الأولى)', ageMonths: 12 },
  { id: 'DTaP4', name: 'الثلاثي البكتيري (الجرعة الرابعة)', ageMonths: 18 },
];

export const initialChildren = [
  {
    id: 1,
    name: 'نور',
    birthDate: '2024-03-15',
    avatarUrl: 'https://images.unsplash.com/photo-1519699047748-605c05a57a83',
    get ageInMonths() { return differenceInMonths(new Date(), parseISO(this.birthDate)); },
    vaccines: vaccinesData.map(v => ({ ...v, done: v.ageMonths < differenceInMonths(new Date(), parseISO('2024-03-15')) ? true : false })),
  },
  {
    id: 2,
    name: 'يوسف',
    birthDate: '2023-01-20',
    avatarUrl: 'https://images.unsplash.com/photo-1503443207922-dff7d54379e9',
    get ageInMonths() { return differenceInMonths(new Date(), parseISO(this.birthDate)); },
    vaccines: vaccinesData.map(v => ({ ...v, done: v.ageMonths < differenceInMonths(new Date(), parseISO('2023-01-20')) ? true : false })),
  },
];

export const healthTipsData = [
  {
    id: 'tip1',
    category: 'تغذية',
    title: 'أهمية الرضاعة الطبيعية',
    content: 'توفر الرضاعة الطبيعية التغذية المثالية للرضع. فهي تحتوي على مزيج مثالي من الفيتامينات والبروتينات والدهون - كل ما يحتاجه طفلك للنمو. وهي أسهل في الهضم من الحليب الصناعي.'
  },
  {
    id: 'tip2',
    category: 'نوم',
    title: 'بيئة نوم آمنة للرضيع',
    content: 'يجب أن ينام الأطفال دائمًا على ظهورهم على سطح نوم ثابت ومستوٍ، مثل سرير أطفال معتمد للسلامة. حافظ على منطقة النوم خالية من البطانيات والوسائد والألعاب اللينة.'
  },
  {
    id: 'tip3',
    category: 'تطور',
    title: 'وقت الاستلقاء على البطن',
    content: 'وقت الاستلقاء على البطن ضروري لتقوية رقبة الطفل وعضلات الكتف، وتحسين المهارات الحركية، ومنع ظهور بقع مسطحة على الجزء الخلفي من رأس الطفل. ابدأ بجلسات قصيرة عدة مرات في اليوم.'
  },
  {
    id: 'tip4',
    category: 'صحة',
    title: 'علامات التسنين وكيفية التعامل معها',
    content: 'تشمل علامات التسنين سيلان اللعاب، والتهيج، ومضغ الأشياء. يمكنك تهدئة لثة طفلك عن طريق فركها بلطف بإصبع نظيف أو تقديم حلقة تسنين صلبة.'
  },
];
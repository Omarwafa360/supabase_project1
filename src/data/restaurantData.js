
import { ChefHat, Utensils, Coffee, Clock, Star, Users, Award, Heart } from 'lucide-react';

export const menuCategories = [
  {
    id: 1,
    name: "المقبلات",
    icon: Utensils,
    items: [
      {
        id: 1,
        name: "حمص بالطحينة",
        description: "حمص طازج مع الطحينة والزيت والصنوبر",
        price: "25 ريال",
        image: "https://images.unsplash.com/photo-1571197119282-7c4e2b8b8d4a"
      },
      {
        id: 2,
        name: "متبل الباذنجان",
        description: "باذنجان مشوي مع الطحينة والثوم",
        price: "20 ريال",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b"
      },
      {
        id: 3,
        name: "فتوش",
        description: "سلطة خضار مشكلة مع الخبز المحمص",
        price: "30 ريال",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
      }
    ]
  },
  {
    id: 2,
    name: "الأطباق الرئيسية",
    icon: ChefHat,
    items: [
      {
        id: 4,
        name: "كبسة الدجاج",
        description: "أرز بسمتي مع دجاج مشوي والتوابل الخاصة",
        price: "65 ريال",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c"
      },
      {
        id: 5,
        name: "مندي اللحم",
        description: "لحم غنم طري مع أرز مندي مدخن",
        price: "85 ريال",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975"
      },
      {
        id: 6,
        name: "سمك مشوي",
        description: "سمك طازج مشوي مع الخضار والأرز",
        price: "70 ريال",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
      }
    ]
  },
  {
    id: 3,
    name: "المشروبات",
    icon: Coffee,
    items: [
      {
        id: 7,
        name: "عصير برتقال طازج",
        description: "عصير برتقال طبيعي 100%",
        price: "15 ريال",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423"
      },
      {
        id: 8,
        name: "شاي أحمر",
        description: "شاي أحمر مع النعناع والسكر",
        price: "8 ريال",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc"
      },
      {
        id: 9,
        name: "قهوة عربية",
        description: "قهوة عربية أصيلة مع التمر",
        price: "12 ريال",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e"
      }
    ]
  }
];

export const services = [
  {
    id: 1,
    title: "خدمة التوصيل",
    description: "نوصل طلباتك إلى باب منزلك في أسرع وقت ممكن",
    icon: Clock
  },
  {
    id: 2,
    title: "حجز الطاولات",
    description: "احجز طاولتك مسبقاً لضمان مكان مريح",
    icon: Users
  },
  {
    id: 3,
    title: "المناسبات الخاصة",
    description: "نقدم خدمات الطعام للمناسبات والحفلات",
    icon: Heart
  },
  {
    id: 4,
    title: "الطعام الصحي",
    description: "جميع أطباقنا محضرة من مكونات طازجة وصحية",
    icon: Award
  }
];

export const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    rating: 5,
    comment: "أفضل مطعم جربته في المدينة! الطعام لذيذ والخدمة ممتازة.",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "فاطمة علي",
    rating: 5,
    comment: "الكبسة هنا لا تُقاوم، والأجواء رائعة للعائلات.",
    date: "2024-01-10"
  },
  {
    id: 3,
    name: "محمد السعيد",
    rating: 4,
    comment: "خدمة سريعة وطعام شهي، أنصح بزيارة المطعم.",
    date: "2024-01-05"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "فوائد الطعام العربي التقليدي",
    excerpt: "تعرف على الفوائد الصحية للمأكولات العربية الأصيلة وكيف تساهم في نمط حياة صحي.",
    content: "<p>الطعام العربي التقليدي غني بالعناصر الغذائية المفيدة...</p>",
    author: "الشيف أحمد",
    date: "2024-01-20",
    category: "صحة وتغذية",
    slug: "benefits-of-traditional-arabic-food"
  },
  {
    id: 2,
    title: "أسرار تحضير الكبسة الأصيلة",
    excerpt: "اكتشف الطريقة التقليدية لتحضير الكبسة بنكهتها الأصيلة والمميزة.",
    content: "<p>الكبسة من أشهر الأطباق العربية...</p>",
    author: "الشيف فاطمة",
    date: "2024-01-18",
    category: "وصفات",
    slug: "kabsa-cooking-secrets"
  },
  {
    id: 3,
    title: "تاريخ المطبخ العربي",
    excerpt: "رحلة عبر التاريخ لاستكشاف تطور المطبخ العربي عبر العصور.",
    content: "<p>يمتد تاريخ المطبخ العربي لآلاف السنين...</p>",
    author: "د. سارة أحمد",
    date: "2024-01-15",
    category: "ثقافة",
    slug: "history-of-arabic-cuisine"
  }
];

export const team = [
  {
    name: "الشيف أحمد محمد",
    title: "الشيف التنفيذي",
    bio: "خبرة 15 عاماً في المطبخ العربي والعالمي، متخصص في الأطباق التقليدية."
  },
  {
    name: "فاطمة علي",
    title: "مديرة المطعم",
    bio: "خبيرة في إدارة المطاعم وخدمة العملاء، تضمن أفضل تجربة لضيوفنا."
  },
  {
    name: "محمد السعيد",
    title: "نائب الشيف",
    bio: "متخصص في المقبلات والسلطات، يضيف لمسة إبداعية لكل طبق."
  }
];

export const certificates = [
  {
    id: 1,
    title: "شهادة الجودة الغذائية",
    issuer: "وزارة الصحة",
    year: "2024"
  },
  {
    id: 2,
    title: "شهادة أفضل مطعم عربي",
    issuer: "جمعية المطاعم السعودية",
    year: "2023"
  },
  {
    id: 3,
    title: "شهادة السلامة الغذائية",
    issuer: "الهيئة العامة للغذاء والدواء",
    year: "2024"
  }
];

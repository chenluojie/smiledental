import { Service, Doctor, Testimonial, Language } from './types';

export const CLINIC_INFO = {
  name: "SmileCare Dental",
  chineseName: "微笑牙科",
  address: {
    en: "123 Kangjian Road, Chaoyang District, Beijing",
    zh: "北京市朝阳区康健路123号"
  },
  phone: "+86 10 1234 5678",
  email: "contact@smilecaredental.com",
  openingHours: {
    en: "Mon-Sat: 9:00 AM - 6:00 PM",
    zh: "周一至周六: 9:00 - 18:00"
  }
};

export const TRANSLATIONS = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      doctors: 'Doctors',
      testimonials: 'Testimonials',
      contact: 'Contact',
      bookBtn: 'Book Now',
      bookFull: 'Book Appointment'
    },
    hero: {
      titleStart: 'Your Brightest Smile',
      titleEnd: 'Starts Here',
      subtitle: 'Experience world-class dental care with a gentle touch. From routine checkups to advanced cosmetic dentistry, our expert team is dedicated to your oral health and confidence.',
      ctaBook: 'Book Appointment',
      ctaServices: 'View Services',
      trust: {
        certified: 'Certified Experts',
        support: '24/7 Support',
        rated: 'Top Rated'
      }
    },
    services: {
      label: 'Our Services',
      title: 'Comprehensive Dental Care',
      subtitle: 'We use the latest technology to ensure your treatment is precise, efficient, and comfortable.',
      startFrom: 'Starting from'
    },
    team: {
      title: 'Meet Our Specialists',
      subtitle: 'Highly qualified professionals dedicated to your smile.',
      viewProfile: 'View Profile',
      bookVisit: 'Book Visit',
      education: 'Education',
      bio: 'Professional Bio'
    },
    testimonials: {
      title: 'Patient Testimonials'
    },
    appointment: {
      successTitle: 'Booking Confirmed!',
      successMsg: (name: string, date: string, phone: string) => `Thank you, ${name}. We have received your appointment request for ${date}. Our team will contact you at ${phone} shortly to finalize the details.`,
      bookAnother: 'Book Another',
      title: 'Book an Appointment',
      subtitle: "Ready to smile? Fill out the form below and we'll get you scheduled.",
      form: {
        name: 'Full Name',
        phone: 'Phone Number',
        date: 'Preferred Date',
        service: 'Service Type',
        servicePlaceholder: 'Select a service',
        doctor: 'Preferred Doctor (Optional)',
        doctorAny: 'Any Doctor',
        notes: 'Additional Notes',
        notesPlaceholder: 'Any specific pain or concerns?',
        submit: 'Confirm Appointment',
        processing: 'Processing...'
      }
    },
    footer: {
      desc: 'Dedicated to providing the highest quality dental care in a comfortable and relaxed environment.',
      contact: 'Contact Us',
      hours: 'Opening Hours',
      sunday: 'Sunday: Closed',
      emergency: '* Emergency services available 24/7 via hotline.',
      rights: 'All rights reserved.',
      staffPortal: 'Staff Portal'
    },
    admin: {
      title: 'Appointment Management',
      back: 'Back to Site',
      loginTitle: 'Staff Access',
      password: 'Password',
      login: 'Login',
      noAppointments: 'No appointments found.',
      table: {
        patient: 'Patient',
        contact: 'Contact',
        date: 'Appointment Date',
        service: 'Service',
        status: 'Status',
        actions: 'Actions'
      },
      status: {
        pending: 'Pending',
        contacted: 'Contacted'
      }
    },
    chat: {
      greeting: 'Hello! I am SmileBot 🦷. How can I help you with your dental needs today?',
      placeholder: 'Ask about prices, procedures...',
      disclaimer: 'AI can make mistakes. Please verify important medical info.',
      title: 'SmileBot AI',
      online: 'Online'
    }
  },
  zh: {
    nav: {
      home: '首页',
      services: '服务项目',
      doctors: '专家团队',
      testimonials: '患者评价',
      contact: '联系我们',
      bookBtn: '立即预约',
      bookFull: '预约挂号'
    },
    hero: {
      titleStart: '自信笑容',
      titleEnd: '从齿开始',
      subtitle: '体验世界级的牙科护理。从常规检查到高级美容牙科，我们的专家团队致力于您的口腔健康和自信。',
      ctaBook: '立即预约',
      ctaServices: '查看服务',
      trust: {
        certified: '专家认证',
        support: '24/7 支持',
        rated: '顶级口碑'
      }
    },
    services: {
      label: '服务项目',
      title: '全方位牙科护理',
      subtitle: '我们使用最新技术，确保您的治疗精准、高效且舒适。',
      startFrom: '起价'
    },
    team: {
      title: '认识我们的专家',
      subtitle: '致力于为您打造完美笑容的高素质专业团队。',
      viewProfile: '查看资料',
      bookVisit: '预约医生',
      education: '教育背景',
      bio: '个人简介'
    },
    testimonials: {
      title: '患者心声'
    },
    appointment: {
      successTitle: '预约已确认！',
      successMsg: (name: string, date: string, phone: string) => `谢谢您，${name}。我们已收到您 ${date} 的预约请求。我们的团队稍后将致电 ${phone} 与您确认详细信息。`,
      bookAnother: '再次预约',
      title: '在线预约',
      subtitle: "准备好绽放笑容了吗？填写下方表格，我们将为您安排。",
      form: {
        name: '您的姓名',
        phone: '联系电话',
        date: '期望日期',
        service: '服务类型',
        servicePlaceholder: '选择服务',
        doctor: '指定医生（可选）',
        doctorAny: '任意医生',
        notes: '备注信息',
        notesPlaceholder: '有什么具体的疼痛或顾虑吗？',
        submit: '确认预约',
        processing: '处理中...'
      }
    },
    footer: {
      desc: '致力于在舒适轻松的环境中提供最高质量的牙科护理。',
      contact: '联系方式',
      hours: '营业时间',
      sunday: '周日: 休息',
      emergency: '* 紧急服务可通过热线 24/7 获取。',
      rights: '版权所有。',
      staffPortal: '员工入口'
    },
    admin: {
      title: '预约信息管理',
      back: '回到首页',
      loginTitle: '员工登录',
      password: '密码',
      login: '登录',
      noAppointments: '暂无预约信息。',
      table: {
        patient: '患者',
        contact: '联系电话',
        date: '预约日期',
        service: '项目',
        status: '状态',
        actions: '操作'
      },
      status: {
        pending: '待跟进',
        contacted: '已联系'
      }
    },
    chat: {
      greeting: '您好！我是 SmileBot 🦷。今天有什么可以帮您的吗？',
      placeholder: '咨询价格、治疗项目...',
      disclaimer: 'AI可能会犯错。请核实重要的医疗信息。',
      title: 'SmileBot 智能助手',
      online: '在线'
    }
  }
};

export const SERVICES: Service[] = [
  {
    id: '1',
    title: { en: 'Teeth Cleaning', zh: '超声波洁牙' },
    description: {
      en: 'Professional ultrasonic cleaning to remove plaque and tartar buildup, ensuring gum health.',
      zh: '专业超声波洁牙，去除牙菌斑和牙结石，确保牙龈健康。'
    },
    icon: 'Sparkles',
    priceStart: '¥300'
  },
  {
    id: '2',
    title: { en: 'Teeth Whitening', zh: '牙齿冷光美白' },
    description: {
      en: 'Advanced laser whitening treatment to brighten your smile by up to 8 shades in one session.',
      zh: '先进的冷光美白治疗，一次疗程即可让您的笑容提亮多达8个色阶。'
    },
    icon: 'Sun',
    priceStart: '¥1200'
  },
  {
    id: '3',
    title: { en: 'Dental Implants', zh: '种植牙' },
    description: {
      en: 'Permanent solution for missing teeth using high-grade titanium implants and ceramic crowns.',
      zh: '使用高档钛合金植入体和全瓷牙冠，为缺失牙齿提供永久性解决方案。'
    },
    icon: 'Anchor',
    priceStart: '¥6000'
  },
  {
    id: '4',
    title: { en: 'Orthodontics', zh: '牙齿矫正' },
    description: {
      en: 'Correction of teeth alignment using traditional braces or invisible clear aligners (Invisalign).',
      zh: '使用传统牙套或隐形矫正器（隐适美）矫正牙齿排列。'
    },
    icon: 'Smile',
    priceStart: '¥15000'
  },
  {
    id: '5',
    title: { en: 'Root Canal', zh: '根管治疗' },
    description: {
      en: 'Pain-free root canal therapy to save infected teeth and restore full function.',
      zh: '无痛根管治疗，挽救感染牙齿并恢复全部功能。'
    },
    icon: 'Activity',
    priceStart: '¥1500'
  },
  {
    id: '6',
    title: { en: 'Pediatric Dentistry', zh: '儿童齿科' },
    description: {
      en: 'Gentle dental care specifically designed for children to build healthy habits early.',
      zh: '专为儿童设计的温和牙科护理，从小培养健康的口腔习惯。'
    },
    icon: 'Heart',
    priceStart: '¥200'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: { en: 'Dr. Li Wei', zh: '李伟 医生' },
    title: { en: 'Chief Dentist', zh: '首席牙医' },
    specialty: { en: 'Implantology & Surgery', zh: '种植与外科' },
    image: 'https://picsum.photos/300/300?random=1',
    experience: { en: '15 Years', zh: '15年经验' },
    bio: { 
      en: 'Dr. Li has over 15 years of experience in complex dental implants and oral surgery. He is known for his precision and patient-first approach.',
      zh: '李医生在复杂的种植牙和口腔外科领域拥有超过15年的经验。他以手术精准和“患者至上”的理念而闻名。'
    },
    education: {
      en: 'PhD in Oral Surgery from Peking University School of Stomatology.',
      zh: '北京大学口腔医学院口腔外科学博士。'
    }
  },
  {
    id: 'd2',
    name: { en: 'Dr. Sarah Chen', zh: 'Sarah Chen 医生' },
    title: { en: 'Senior Orthodontist', zh: '资深正畸医师' },
    specialty: { en: 'Invisalign & Braces', zh: '隐适美与牙套' },
    image: 'https://picsum.photos/300/300?random=2',
    experience: { en: '10 Years', zh: '10年经验' },
    bio: {
      en: 'Specializing in digital orthodontics, Dr. Chen has helped thousands of patients achieve perfect smiles using the latest Invisalign technology.',
      zh: '陈医生专注于数字化正畸，已使用最新的隐适美技术帮助数千名患者实现了完美的笑容。'
    },
    education: {
      en: 'Master of Orthodontics, Shanghai Jiao Tong University.',
      zh: '上海交通大学正畸学硕士。'
    }
  },
  {
    id: 'd3',
    name: { en: 'Dr. Wang Jun', zh: '王俊 医生' },
    title: { en: 'General Dentist', zh: '全科牙医' },
    specialty: { en: 'Restorative & Cosmetic', zh: '修复与美容' },
    image: 'https://picsum.photos/300/300?random=3',
    experience: { en: '8 Years', zh: '8年经验' },
    bio: {
      en: 'Dr. Wang excels in aesthetic restorative dentistry, including veneers and full-mouth rehabilitation, focusing on natural-looking results.',
      zh: '王医生在美学修复牙科方面表现出色，包括瓷贴面和全口重建，专注于打造自然美观的治疗效果。'
    },
    education: {
      en: 'BDS, Sichuan University West China College of Stomatology.',
      zh: '四川大学华西口腔医学院学士。'
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: { en: 'Zhang Min', zh: '张敏' },
    comment: {
      en: 'The best dental experience I have ever had. Painless and very professional.',
      zh: '这是我有过的最好的看牙经历。无痛且非常专业。'
    },
    rating: 5
  },
  {
    id: 't2',
    name: { en: 'Michael Ross', zh: 'Michael Ross' },
    comment: {
      en: 'Great English speaking staff. Dr. Li explained everything clearly regarding my implant.',
      zh: '很棒的英语服务。李医生清楚地解释了关于我种植牙的所有事项。'
    },
    rating: 5
  },
  {
    id: 't3',
    name: { en: 'Liu Fang', zh: '刘芳' },
    comment: {
      en: 'My kids love coming here. The pediatric room is very welcoming.',
      zh: '我的孩子们很喜欢来这里。儿童诊室非常温馨。'
    },
    rating: 4
  }
];
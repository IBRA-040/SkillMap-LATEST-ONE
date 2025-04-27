import frontendimg from "../assets/Images/frontend.jpeg";
import backendimg from "../assets/Images/backend.jpeg";
import fullstackimg from "../assets/Images/fullstack.jpeg";
import flutterimg from "../assets/Images/flutter.jpeg";
import cybersecurityimg from "../assets/Images/cyber security.jpeg";
import seoimg from "../assets/Images/seo.jpeg";
import socialmediaimg from "../assets/Images/social media.jpeg";
import digitalmarketingimg from "../assets/Images/digital marketing.jpeg";
import devopsimg from "../assets/Images/devops.jpeg";
import contentmakigimg from "../assets/Images/content making.jpeg";
import googleadsaimg from "../assets/Images/google ads.jpeg";
import emailmarketimg from "../assets/Images/email marketing.jpeg";
import uiuximg from "../assets/Images/uiux.jpeg";
import logodesignimg from "../assets/Images/logo design.jpeg";
import graphicdesignimg from "../assets/Images/graphic design.jpeg";
import brandimg from "../assets/Images/brand.jpeg";
import typographyimg from "../assets/Images/typography.jpeg";
const posts = [
  {
    id: 1,
    title: "Frontend Development",
    offeredBy: "Ahmed Ibrahim",
    description:
      "Learn how to build beautiful and responsive user interfaces using HTML, CSS, JavaScript, and modern frameworks like React.",
    status: "Online",
    category: "Programming Courses",
    image: frontendimg,
    videos: [
      "https://www.youtube.com/embed/6QAELgirvjs",
      "https://www.youtube.com/embed/videoseries?list=PLDoPjvoNmBAzjsz06gkzlSrlev53MGIKe",
      "https://www.youtube.com/embed/GM6dQBmc-Xg?si=QvYZCvPuHcgEHMVz",
    ],
  },
  {
    id: 2,
    title: "Backend Development",
    offeredBy: "John Doe",
    description: "Offering Back-End Web Development help (Node.js, MongoDB).",
    status: "Pending",
    category: "Programming Courses",
    image: backendimg,
    videos: [
      "https://www.youtube.com/embed/videoseries?si=Hta64epb2LH6W-hF&amp;list=PLeWmXrh00479LgmvKAdU8WV2nRXqX4ley",
      "https://www.youtube.com/embed/videoseries?si=5bXgnNVonR97IKZo&amp;list=PLd6o9p13Lc5387FWk_GXU0Rh5AhrBGod5",
      "https://www.youtube.com/embed/videoseries?si=dNbD2LLbq9QHJSo9&amp;list=PLhiFu-f80eo_90Mx37BzcIl9UJCNfEdQ_",
    ],
  },
  {
    id: 3,
    title: "UI/UX Design",
    offeredBy: "Mohamed Atef",
    description: "Offering UX Design help (Wireframing, Prototyping, User Research).",
    status: "Completed",
    category: "Design Courses",
    image: uiuximg,
    videos: [
      "https://www.youtube.com/embed/LkX8acAE8_A?si=fzD_z9R6sCmg1vCt",
      "https://www.youtube.com/embed/MJDPFYe_0g0?si=QJn-kiJq_gY5zc3L",
    ],
  },
  {
    id: 4,
    title: "Full Stack Development",
    offeredBy: "Sara Khaled",
    description:
      "Become a complete web developer by mastering both frontend and backend technologies.",
    status: "On-site",
    category: "Programming Courses",
    image: fullstackimg,
    videos: [
      "https://www.youtube.com/embed/Pwatx1n1Ws0?si=CZzB0Wcz_nJrDt4h",
      "https://www.youtube.com/embed/videoseries?si=5bXgnNVonR97IKZo&amp;list=PLd6o9p13Lc5387FWk_GXU0Rh5AhrBGod5",
      "https://www.youtube.com/embed/videoseries?si=dNbD2LLbq9QHJSo9&amp;list=PLhiFu-f80eo_90Mx37BzcIl9UJCNfEdQ_",
    ],
  },
  {
    id: 5,
    title: "Digital Marketing Fundamentals",
    offeredBy: "Laila Hassan",
    description:
      "Learn the basics of digital marketing, SEO, social media strategies, and online advertising.",
    status: "Online",
    category: "Digital Marketing Courses",
    image: digitalmarketingimg,
    videos: [
      "https://www.youtube.com/embed/videoseries?si=TOpYffdIvQN5Bkn6&amp;list=PLSs_pbz-a5V6NcNBiZcbP830XteVuK__r",
      "https://www.youtube.com/embed/videoseries?si=ulTeQTKSTeyI0nCD&amp;list=PLdUaS_5kt47lYK8PfvRYIYljYpD1_YQun",
    ],
  },
  {
    id: 6,
    title: "DevOps Engineering",
    offeredBy: "Omar Nabil",
    description: "Master CI/CD pipelines, Docker, Kubernetes, and infrastructure as code.",
    status: "Online",
    category: "Programming Courses",
    image: devopsimg,
    videos: ["https://www.youtube.com/embed/KvZ5xyLT-Dw?si=E5daFS1MB9zIsBVU"],
  },
  {
    id: 7,
    title: "Data Analysis with Python",
    offeredBy: "Salma Youssef",
    description: "Analyze data using Python, Pandas, NumPy, and create insightful visualizations.",
    status: "Online",
    category: "Programming Courses",

    videos: [
      "https://www.youtube.com/embed/5ScjeYvD0pw?si=czQfb9lNWlY8b_iO",
      "https://www.youtube.com/embed/pBnAJSVOXlI?si=Edyh7C4esO4US_Aq",
    ],
  },
  {
    id: 8,
    title: "Cyber Security Essentials",
    offeredBy: "Karim Hassan",
    description: "Learn the fundamentals of cyber security, ethical hacking, and securing systems.",
    status: "Online",
    category: "Programming Courses",
    image: cybersecurityimg,
    videos: [
      "https://www.youtube.com/embed/videoseries?si=8Kv1wKsBXGiaehaX&amp;list=PLh2Jy0nKL_j1WZMzITHgUuzaadpSULlMm",
      "https://www.youtube.com/embed/992xydXkZnw?si=Hmu_N7I3b67CmwUz",
    ],
  },
  {
    id: 9,
    title: "Flutter App Development",
    offeredBy: "Zyad Adel",
    description: "Create beautiful cross-platform mobile applications using Flutter and Dart.",
    status: "Online",
    category: "Programming Courses",
    image: flutterimg,
    videos: [
      "https://www.youtube.com/embed/videoseries?si=HJXm8LSoIYR8p06O&amp;list=PL93xoMrxRJIvtIXjAiX15wcyNv-LOWZa9",
    ],
  },
  {
    id: 10,
    title: "SEO Mastery",
    offeredBy: "Fatma Salah",
    description: "Boost website visibility with advanced SEO strategies and techniques.",
    status: "Online",
    category: "Digital Marketing Courses",
    image: seoimg,
    videos: [
      "https://www.youtube.com/embed/videoseries?si=cOpK_IWsni3-DKd2&amp;list=PLAOJNfhkbzlW4SVFtg91kYzgTJ0KFI5uN",
      "https://www.youtube.com/embed/videoseries?si=H6X6nC-_99ji2XQ1&amp;list=PLDBZv8iuGMncW_lEf-yzgv67-5-djkijX",
    ],
  },
  {
    id: 11,
    title: "Social Media Marketing",
    offeredBy: "Youssef Adel",
    description: "Leverage social media platforms to grow your brand and engage your audience.",
    status: "Online",
    category: "Digital Marketing Courses",
    image: socialmediaimg,
    videos: [
      "https://www.youtube.com/embed/videoseries?si=mZ_anpzLd-wperjE&amp;list=PLyf3uHmOBoom2gpmABHPwxoNfjwyu-YYf",
      "https://www.youtube.com/embed/videoseries?si=TZBHHOXe4vAiWPX8&amp;list=PLjVJ8-uTaGNMw7nBZ12PcjBmZZ7UGXhqO",
    ],
  },
  {
    id: 12,
    title: "Google Ads Bootcamp",
    offeredBy: "Nada Ahmed",
    description: "Learn to set up, manage, and optimize Google Ads campaigns for maximum ROI.",
    status: "Online",
    category: "Digital Marketing Courses",
    image: googleadsaimg,
    videos: ["https://www.youtube.com/embed/9lodL8Bk6Dg?si=wJQym-eNRcsBMWHF"],
  },
  {
    id: 13,
    title: "Email Marketing Strategies",
    offeredBy: "Ali Hossam",
    description: "Craft high-converting email campaigns and build strong customer relationships.",
    status: "Online",
    category: "Digital Marketing Courses",
    image: emailmarketimg,
    videos: ["https://www.youtube.com/embed/_XJlCvjyYpo?si=cNztzTmJGqiVyGSg"],
  },
  {
    id: 14,
    title: "Content Marketing Fundamentals",
    offeredBy: "Marwan Khaled",
    description: "Create compelling content that drives traffic and boosts engagement.",
    status: "Online",
    category: "Digital Marketing Courses",
    image: contentmakigimg,
    videos: ["https://www.youtube.com/embed/6Oj6GoYrF-s?si=WMMCxuJpOoZyXMBh"],
  },
  {
    id: 15,
    title: "Graphic Design Basics",
    offeredBy: "Aya Samir",
    description:
      "Learn graphic design principles and create stunning visuals using Adobe Photoshop.",
    status: "Online",
    category: "Design Courses",
    image: graphicdesignimg,
    videos: ["https://www.youtube.com/embed/H-x1cit4GJA?si=TGAT6hygl85tzF99"],
  },
  {
    id: 16,
    title: "Logo Design Workshop",
    offeredBy: "Omar Fathy",
    description: "Master the art of creating memorable and professional logos.",
    status: "Online",
    category: "Design Courses",
    image: logodesignimg,
    videos: ["https://www.youtube.com/embed/sfkrp-ca8Gc?si=9VDqg1jeb6s1Mu66"],
  },
  {
    id: 17,
    title: "Typography Essentials",
    offeredBy: "Lina Magdy",
    description: "Explore the fundamentals of typography and how to apply them effectively.",
    status: "Online",
    category: "Design Courses",
    image: typographyimg,
    videos: ["https://www.youtube.com/embed/QrNi9FmdlxY?si=3VX_LYu6XMIpU0hi"],
  },

  {
    id: 18,
    title: "Brand Identity Design",
    offeredBy: "Sara Younis",
    description: "Develop cohesive brand identities that resonate with target audiences.",
    status: "Online",
    category: "Design Courses",
    image: brandimg,
    videos: ["https://www.youtube.com/embed/n_-ygXZUq3U?si=-rOCi0JjgaT1tgXV"],
  },
];

export default posts;

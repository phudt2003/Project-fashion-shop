import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ALL_MOCK_PRODUCTS = [
  // Footwear
  {
    id: 'sandal-da-thu-cong',
    name: 'Sandal Da Thủ Công',
    price: 2450000,
    category: 'footwear',
    description: 'Da thuộc thực vật, Đế cao su tự nhiên',
    badge: 'Thủ công',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT-6TsUDibpY2TVxpnXsKVMIIBGbvZvaDf5R4RS286uz1Vb0BcjdpetV3WFJZTbLH4kB3T1eOMRhz4NRfxv0bLn1hY9_kmx7QQFM0W7aRNM-VQ1vaXE6Xrcg9kxNrQzdmHjVnSSm6usDz2rMDMzKZ9kh995K7gd3vz9mu_mrko4n37e85zK7oB70PsglgEiQBcQldKP_52yc1Xkc0O0HyLDjlYIIWlIIK9e9jbJiZLydclRegh23PYE7670x9RE44AZNvdqXp8dk9r',
    sizes: ['36', '37', '38', '39'],
    colors: ['#F2ECE6', '#8c4a2d'],
  },
  {
    id: 'loafers-da-cao-cap',
    name: 'Loafers Da Cao Cấp',
    price: 3850000,
    category: 'footwear',
    description: 'Da bò Ý, Lót đệm thoáng khí',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeTktd3lImP1Pkv3-wGkWQZ5N97TGxADtU4zXkHD3L6CKJfJI_I64rLcOF7vHovE_SjIJrqEHb1E521EDixaxp9zbX8jlacwwZYbbMMPpsNcRXQRcLzhkEzEyYKblG2Y5LaRFGtbCOMS-YD8d0r1FXU08NqH846gfS0t6Cbiy8h64nGFXTBMacyeK2de_0aNZoSKSb6iQeQ8tfEOvEuO8-W0KGmZav66G7l_GGg3AuPP8lAocWhkcEpt6-pNvpVv2MiyAP8WWMq2mM',
    sizes: ['38', '39', '40', '41', '42'],
    colors: ['#8c4a2d', '#31302f'],
  },
  {
    id: 'giay-sneaker-canvas',
    name: 'Giày Sneaker Canvas',
    price: 1950000,
    category: 'footwear',
    description: 'Vải lanh hữu cơ, Đế bần tái chế',
    badge: 'Bán chạy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn_QXJPzqmLHfjVjt1xCXCB2RGRBKhUUqNqXppmAqUWgIQ51fXVdM3Xg0gH230Y9sco4VkPXzQ6mFkmFrArHGPSPHHpLRJmPgO0UOqp4s-v1IJpyzUETl23prvtzhF-hG02UiEEtBPu9I0eultse-NPT69G3c4XybdGQIwSMRiPX-cnj0vPE2LLqXJ81BPrGCRChv0o7DKQj2evQ5xyYb58n-MLdA7W-rug5GjyrcjK9fEJdmiF5x_Nl1Ld1hlLXdiJ6GbQTBZWTp0',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: ['#F2ECE6', '#D6E4D8'],
  },
  {
    id: 'mules-da-thanh-lich',
    name: 'Mules Da Thanh Lịch',
    price: 2650000,
    category: 'footwear',
    description: 'Da mềm Pastel, Gót gỗ tự nhiên',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd59E5_JFycovvDrPO6inKDNIfYcPqpCNON-yH1ieSt1CFQC9iAIEL166gdAPUcoX1XxWZsQIblJlrsdBduSEZzhgcSpCRw5ugFZao_WVULdibE9SxZCx2ThtLF8V4CGrmLBwhnQLwg9gRScn_kSnL9XnHIxILD4EG5Jkf14RaAiX3cIR6Qv781jfMSA7tar36BQ7LbYzmohHr-1ve-DAwi0nuH31RIMhiNfLMJ6q4DaHmL_atvAejP2nKbSe2M5odCmPEZbdMO-iQ',
    sizes: ['36', '37', '38', '39'],
    colors: ['#D6E4D8', '#F2ECE6'],
  },
  // Nam (Men)
  {
    id: 'ao-len-thu-cong',
    name: 'Áo Len Thủ công',
    price: 1450000,
    category: 'nam',
    description: '100% Organic Wool, Dệt tay tỉ mỉ',
    badge: 'BÁN CHẠY',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5ZtF7K9E9fP4Izkxdo19nIBGLNM4fdNu9J0C-iHkDW956ssl_kksXFS53KEOUcV7XP0mXL46l4mRi2db8d2Ssl1IIzLpNrreho01o_-tjjxdxSDuiy4A9QbzZj_m8B8M9pXVukRy0fs6V8i9tVZamb59ofJhgdW0RVpoLl8qtiKOfjOs9cZ60kfWtGjxT61guTkuH8VYc3uXabONMYAuwzwQiXr4i9f5alMK086hVapNa9LgB5h4FRO4UxO_5Seu_nyMElkRexO_v',
    sizes: ['M', 'L', 'XL'],
    colors: ['#8c4a2d', '#31302f'],
  },
  {
    id: 'ao-khoac-mang-to',
    name: 'Áo Khoác Măng Tô',
    price: 2360000,
    category: 'nam',
    description: 'Thương hiệu Việt, Kiểu dáng tối giản',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP9RNa40ak-m6ZcIb9tZTCCqGAouJQDLm09E76NSVSmOeUPu5Z1RjYP9Mo2pPObRrDqtPGl7fXvxTp1isJzP0UuoVqd4lqaJXgHsmb2r0fakcannzYQPWHClLa8cD_k-1ieNdnA9F3CCDWJsZ6Wcfm-67eVQ8SFg792_m5sLYGN2iD-cmOUyhbFcXmDA9e0V3N7LkXsMjKqfajgbL7IvRntzcjGN5TnZykprtakbTRaKjQHplhhgmlEViDji2cfL3J6b7LBuWdbQYI',
    sizes: ['M', 'L', 'XL'],
    colors: ['#31302f', '#8c4a2d'],
  },
  {
    id: 'quan-tay-xep-ly-cao-cap',
    name: 'Quần Tây Xếp Ly Cao Cấp',
    price: 1950000,
    category: 'nam',
    description: 'Vải Cotton tự nhiên, Giữ phom dáng chuẩn',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYHEs2bk4OCUbYSJQrr2W_tRTv5n5NHnnPBEMy6fb9fYtXwE9f62PZXpojCyDTtt2w3Wcl9cIxH4BkOJhGwFiKX2Bck86HfaprFGoobz2hyIfUx-iyL9Fld1_OoBCCrenRAyQHqPmymO-1G3zqsZ9B5VZH5sZhkRHiaw6va7xvwwgHbH9rjTmOB88__IlHqAhFfAWWtst2Bb8kEjpTRX97Ly-UC-xE4lKdCdW1kLYKFzZi01Jx7C6n9M1eq1WUPFAmdWFNwlPbBW_u',
    sizes: ['M', 'L', 'XL'],
    colors: ['#31302f'],
  },
  // Nữ (Women)
  {
    id: 'ao-len-van-thung',
    name: 'Áo Len Vặn Thừng',
    price: 1110000,
    category: 'nu',
    description: 'Sợi len tự nhiên, Mềm mịn thoáng khí',
    badge: '-40%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEEZ22GqCmWse1i8pp2UqXQvpA0M_dqFONLWqxD9TkPWnDAMq916EBbnS898U5bkyGh0SneTpJ7a8THyk6zZUaJa8qyQPCBNFpBG3g30x1v4qxeDUGT57ErGUpG72YGDEi67v-DyKunWgiKMTychMScuQYtVgTasV8IZJYKkQI7-ukhQBuiSlUBbLi45clEwrx8WMWhkXcGD7j0ZYbJ9mLmrKGsBuUnpyLyv3yp44vGSDRfgZC6LD0IsFTwCGrVehlbx90TWVWmyNn',
    sizes: ['S', 'M', 'L'],
    colors: ['#F2ECE6', '#8c4a2d'],
  },
  {
    id: 'vay-lua-terracotta',
    name: 'Váy Lụa Terracotta',
    price: 2150000,
    category: 'nu',
    description: '100% Silk cao cấp, Màu đất nung sang trọng',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjtW8Uz9JBPFvk2W_tcCG1a4iCrmhVzKJmKRg9EaxGctmpSjPHN2wMP_DUEZZmZ6wJVHkTDmQ38mDSIXiSgiyLVcFr86kalKXMmpTafmr9_5EeSQLzPgSeksYcM_bsjibG0vKr65VQ4On2x1KoLF_ly5XciZdHDmS4ZOpiaAQZ38qtwB8xMvbFIp2HNO9JVE5UKvY-rKOYjD5xSjJpez5WTHqOhg7_7Vk8S1aiWK_c8OMHOxutsPqsYLGX1QOpGwzGOneVoOzUyxSp',
    sizes: ['S', 'M'],
    colors: ['#8c4a2d', '#F2ECE6'],
  },
  {
    id: 'tui-tote-da-thuc-vat',
    name: 'Túi Tote Da Thực vật',
    price: 890000,
    category: 'nu',
    description: 'Da từ sợi dứa, Đóng gói thân thiện môi trường',
    badge: 'MỚI',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVEbetp0gB7o027AyhBpe1lNlr5V97tCdpB0HU5oleriyYIjBPmqpuefj_tZVX16p-V8S0_hrlCZTRTLi0diGtIdhDlkEYXS2ZHszjhFrNzzlVeQy_NFHyM0n6GyyjGkpvOzchpS-kqoQfK-0R8lm3gEfch30ddKpu3rOPDlmgfH35yBINd24RFRk1ao6dqH5byYI8nQNrE8kSQCOmjdDTA8fbb1iR2RlOEHcTgwgn6GtRtKF0JbZl280hlGlY6dr-hrvWZ6vr4lLL',
    sizes: ['Một kích cỡ'],
    colors: ['#F2ECE6'],
  },
  // Đồ bé trai
  {
    id: 'set-ao-thun-quan-linen',
    name: 'Set Áo Thun & Quần Linen',
    price: 950000,
    category: 'do-be-trai',
    type: 'Áo thun & Sơ mi',
    description: 'T-shirt cotton hữu cơ 100% phối quần short linen thoáng khí',
    badge: 'New',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLszNhGB1m8ZVVqQKMPkFZMnGAo4s43gUSm-Io-6jxZIuAcVlxlLKZOL2f2mjm_S0ke6fOg2DSW17h4VnYLhbJCZLTKSS0tXV-4TcpW5bQDl82BjMrfbNeWFv8Y0h6_S1yJ50LRAvXd9ECKJz50nxCUrDXksnSmhP2q-PlNRuCx-AyImpIXVAeH002eCDkRJ6XTyZX0oCurInUvEjdhiXdwR9G9qxF2RqBaNKV0S10MIVJQuR8AbFcJfiU19',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#D6E4D8', '#F2ECE6'],
  },
  {
    id: 'quan-yem-be-trai-linen',
    name: 'Quần & Yếm Linen Bé Trai',
    price: 1150000,
    category: 'do-be-trai',
    type: 'Quần & Yếm',
    description: 'Linen thoáng mát, đường may gọn gàng, dễ vận động',
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1516627145492-a7f7871c2a2b?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L'],
    colors: ['#D6E4D8', '#F2ECE6'],
  },
  {
    id: 'do-len-be-trai-ấm-ap',
    name: 'Đồ Len Ấm Áp Bé Trai',
    price: 1450000,
    category: 'do-be-trai',
    type: 'Đồ len',
    description: 'Giữ ấm tốt, mềm nhẹ, thân thiện cho làn da nhạy cảm',
    badge: 'Ấm áp',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    sizes: ['M', 'L', 'XL'],
    colors: ['#31302f', '#F2ECE6'],
  },
  // Đồ bé gái
  {
    id: 'vay-hoa-nhi-organic',
    name: 'Váy Hoa Nhí Organic',
    price: 1250000,
    category: 'do-be-gai',

    type: 'Váy & Đầm',
    description: 'Cotton organic mềm nhẹ, họa tiết hoa nhỏ',
    badge: 'MỚI',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNpzVPbISbTyuWOLUzwt1ECvEQ3lCwQeMtrDGC9EjmN1QTJz_YKFSA-KGdbZ1_hLlKS014kP8-B4gxO4keH3CNX06VIXpgR5tN_vUJepBAJW2xK78ma9CPxfA47iTbzLY6UDtTq0uAISqdIW11f4UeJ3BC8aYEMM6u6Sit0Pomdo63ZLvXAZChyc5iS_m7qIjigpn4ESWWHzjqKdcZ4_owAMVcrB0gSUONuDS-AbZi4OBR21j7eaiXDRUKFr1h5aSDZnX4laxKFRXg',
    sizes: ['2Y', '3Y', '4Y', '5Y'],
    colors: ['#F2ECE6', '#D6E4D8'],
  },
  {
    id: 'yem-linen-sage',
    name: 'Yếm Linen Sage',
    price: 850000,
    category: 'do-be-gai',
    type: 'Bộ đồ & Đồ mặc nhà',
    description: 'Linen thoáng mát, phom yếm dễ vận động',
    badge: 'ECO',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK6kw8LMCCXy305Vzz4IzfiA8JBRQjnldgVJUJrncTbsttTrtKBM8P22W-YtRAkJ6q09tK6bNsAFhkYgMf4u68-PSzs0ppYJ_0BLK8f0hfz7XPZ9EfwD_6QQROvJRsXIK9bKvXfAgAnXCPu9YYHKUV-d3Olp_bBXwxeeVMRHgRkC3xMyx_9gYaljyBtwA3-5hT31_HSr9NR_4F9kz1vxy-pBincnVKJehuyyQyVvGxS2u6rMBsnYxz5lGSen6H_UF6ZvYcpC_O2jZT',
    sizes: ['3Y', '4Y', '5Y', '6Y'],
    colors: ['#D6E4D8', '#F2ECE6'],
  },
  {
    id: 'set-chan-vay-dusty-rose',
    name: 'Set Chân Váy Dusty Rose',
    price: 1150000,
    category: 'do-be-gai',
    type: 'Bộ đồ & Đồ mặc nhà',
    description: 'Set áo cotton và chân váy hồng phấn',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj5p1wHBC-swQfLiW7If5JsJ6XDKajAFHQbEc4eN2peXIWdTbx6FBJNKRkBogrgOkr7uCzu4CA2HD0INNTpr2hspuNzG8Mozpwck4Twmy3XsxYRUF4F6dO0b1FbdfJEQQjo0QBg0ZzAkFLpfgSRFxGi3NLEYuED-AWXMwOKTO_UJzedB-JWSA3yfn04tCsmymbrKgeyqrS_Ev2SskX2zt9zWIVPECd71-H32J0eWMcpRIn_2WGPIh-SzS2w8PrCZb3r-NCABxYMnpo',
    sizes: ['4Y', '5Y', '6Y', '7Y'],
    colors: ['#D8A2A6', '#F2ECE6'],
  },
  {
    id: 'ao-len-merino-be-gai',
    name: 'Áo Len Merino Bé Gái',
    price: 1450000,
    category: 'do-be-gai',
    type: 'Áo & Áo khoác',
    description: 'Len merino ấm nhẹ, không gây ngứa da',
    badge: 'ẤM ÁP',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuvPQIE6zPdtWX8HC6qSw3Vinj9d3TWZ9r9pvltUTeSe4PDhbqjgNSrhUFsFRBFesuNMpKGSrWLVFn87hlNM7Qm0SlEzhlUc7AgEUS171Bw9J7djOBi2wVSzM-NbBISV5cQQ4iKl-zp_6ND2GjOPmX7-KkYfQm8ptYK5WkWS0FnMVLS7cWRuwzLt5xkhHPO7Rd89xxm5nuxAR5WY9HE2BP4jmBlpgu-fb2d0fgghbon7lWmJZNhY6ItLCp5UteaiW1aNsOzMxah4Dk',
    sizes: ['5Y', '6Y', '7Y', '8Y'],
    colors: ['#8c4a2d', '#F2ECE6'],
  },
  {
    id: 'dam-smock-cotton-kem',
    name: 'Đầm Smock Cotton Kem',
    price: 980000,
    category: 'do-be-gai',
    type: 'Váy & Đầm',
    description: 'Thân smock co giãn, lớp lót cotton dịu da',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80',
    sizes: ['2Y', '3Y', '4Y', '5Y', '6Y'],
    colors: ['#F2ECE6', '#D6E4D8'],
  },
  {
    id: 'ao-khoac-quilted-sage',
    name: 'Áo Khoác Quilted Sage',
    price: 1320000,
    category: 'do-be-gai',
    type: 'Áo & Áo khoác',
    description: 'Chần bông nhẹ, khóa kéo an toàn cho bé',
    badge: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?auto=format&fit=crop&w=900&q=80',
    sizes: ['4Y', '5Y', '6Y', '7Y', '8Y'],
    colors: ['#D6E4D8', '#31302f'],
  },
  {
    id: 'bo-pyjama-hoa-cuc',
    name: 'Bộ Pyjama Hoa Cúc',
    price: 720000,
    category: 'do-be-gai',
    type: 'Bộ đồ & Đồ mặc nhà',
    description: 'Vải modal mềm mịn cho giấc ngủ thoải mái',
    image: 'https://images.unsplash.com/photo-1622295057285-ed0f88067a86?auto=format&fit=crop&w=900&q=80',
    sizes: ['2Y', '3Y', '4Y', '5Y', '6Y'],
    colors: ['#F2ECE6', '#D8A2A6'],
  },
  {
    id: 'chan-vay-tulle-ivory',
    name: 'Chân Váy Tulle Ivory',
    price: 690000,
    category: 'do-be-gai',
    type: 'Váy & Đầm',
    description: 'Tulle nhiều lớp, lưng thun mềm không hằn da',
    badge: 'YÊU THÍCH',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',
    sizes: ['3Y', '4Y', '5Y', '6Y', '7Y'],
    colors: ['#F2ECE6', '#D8A2A6'],
  }
];

const COLOR_LABELS = {
  '#F2ECE6': 'Kem',
  '#8c4a2d': 'Đất nung',
  '#D6E4D8': 'Xanh sage',
  '#31302f': 'Than',
  '#D8A2A6': 'Hồng phấn',
};

export function CategoryPage() {
  const { slug } = useParams();
  const isGirlsCategory = slug === 'do-be-gai';
  const isBoysCategory = slug === 'do-be-trai';
  const isKidsCategory = isGirlsCategory || isBoysCategory;
  const defaultMaxPrice = isKidsCategory ? 5000000 : 10000000;
  const minCatalogPrice = isKidsCategory ? 500000 : 1000000;


  // Active filters states
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
  const [sortOption, setSortOption] = useState('newest');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Reset filters on slug change
  useEffect(() => {
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(slug === 'do-be-gai' ? 5000000 : 10000000);
    setSortOption('newest');
  }, [slug]);

  // Determine Title & Description based on slug
  let pageTitle = 'Bộ sưu tập Giày dép';
  let pageDesc = 'Sự giao thoa giữa nghệ thuật chế tác thủ công và ý thức bảo vệ môi trường. Những đôi giày được tạo nên từ vật liệu bền vững, mang lại sự êm ái tối đa trong từng bước chân.';
  let activeCategory = 'footwear';

  if (slug === 'nam') {
    pageTitle = 'Thời Trang Nam';
    pageDesc = 'Phong cách tối giản thanh lịch dành cho phái mạnh. Chất liệu tự nhiên bền bỉ kết hợp phom dáng chuẩn mực nâng niu lối sống bền vững.';
    activeCategory = 'nam';
  } else if (slug === 'nu') {
    pageTitle = 'Thời Trang Nữ';
    pageDesc = 'Sự nữ tính tự nhiên phản chiếu qua các thiết kế lụa và linen cao cấp. Tinh tế, mềm mại và tôn trọng sự tự do của cơ thể.';
    activeCategory = 'nu';
  } else if (slug === 'do-be-gai') {
    pageTitle = 'Bộ sưu tập Bé Gái';
    pageDesc = 'Khám phá những thiết kế đáng yêu, bền vững và an toàn cho làn da của bé. Mỗi sản phẩm được làm từ chất liệu tự nhiên với phom dáng dễ vận động.';
    activeCategory = 'do-be-gai';
  } else if (slug === 'do-be-trai') {
    pageTitle = 'Bộ sưu tập Bé Trai';
    pageDesc = 'Khám phá những thiết kế tối giản, bền vững và thoải mái dành riêng cho các bé trai. Mỗi sản phẩm được làm từ chất liệu tự nhiên, an toàn cho làn da nhạy cảm.';
    activeCategory = 'do-be-trai';
  }


  // Get raw products for this category
  const categoryProducts = ALL_MOCK_PRODUCTS.filter(
    (p) => p.category === activeCategory
  );

  // Apply filters
  const filteredProducts = categoryProducts.filter((product) => {
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) {
      return false;
    }

    if (selectedSizes.length > 0) {
      const hasMatchingSize = product.sizes.some((size) => selectedSizes.includes(size));
      if (!hasMatchingSize) return false;
    }

    if (selectedColors.length > 0) {
      const hasMatchingColor = product.colors.some((color) => selectedColors.includes(color));
      if (!hasMatchingColor) return false;
    }

    if (product.price > maxPrice) {
      return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'popular') return Number(Boolean(b.badge)) - Number(Boolean(a.badge));
    return 0;
  });

  const typeOptions = Array.from(
    new Set(categoryProducts.map((product) => product.type).filter(Boolean))
  );

  const availableSizes = Array.from(
    new Set(categoryProducts.flatMap((product) => product.sizes))
  );

  const availableColors = Array.from(
    new Set(categoryProducts.flatMap((product) => product.colors))
  ).map((hex) => ({ hex, name: COLOR_LABELS[hex] || hex }));

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() !== '') {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Header */}
      <section className="w-full border-b border-border-subtle bg-surface">
        <div className="max-w-[1440px] mx-auto w-full px-8 md:px-16 py-12 md:py-16">
          <nav className="flex flex-wrap items-center gap-2 mb-4 font-label-uppercase text-label-uppercase text-ink-light">
            <Link className="hover:text-primary transition-colors" to="/">
              Trang chủ
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary transition-colors" to="/products">
              Bộ sưu tập
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">{isGirlsCategory ? 'Đồ bé gái' : isBoysCategory ? 'Đồ bé trai' : pageTitle}</span>

          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-end">
            <div>
              <p className="font-label-uppercase text-label-uppercase text-primary mb-3">
                {isGirlsCategory ? 'Chất liệu dịu da cho bé' : 'STITCH Atelier'}
              </p>
              <h1 className="font-display text-headline-lg md:text-display-mobile text-on-surface mb-element-gap-md">
                {pageTitle}
              </h1>
              <p className="font-body-lg text-body-lg text-ink-light max-w-2xl leading-relaxed">
                {pageDesc}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: 'eco', label: 'Vải tự nhiên' },
                { icon: 'verified', label: 'An toàn da bé' },
                { icon: 'local_shipping', label: 'Đổi size dễ' },
              ].map((item) => (
                <div key={item.label} className="border border-border-subtle bg-surface-container-low px-3 py-4 rounded-lg">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <p className="mt-2 text-caption font-caption text-on-surface-variant uppercase">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Body */}
      <section className="max-w-[1440px] mx-auto w-full px-8 md:px-16 py-section-gap-desktop grid grid-cols-1 md:grid-cols-12 gap-grid-gutter">
        {/* Sidebar Filters */}
        <aside className="col-span-1 md:col-span-3 space-y-element-gap-lg md:sticky md:top-[120px] h-fit border border-border-subtle p-6 rounded-lg bg-white shadow-sm">
          {typeOptions.length > 0 && (
            <div>
              <h3 className="font-label-uppercase text-label-uppercase text-on-surface mb-element-gap-md font-bold">
                Phân loại
              </h3>
              <div className="space-y-3 text-ink-light">
                <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                  <input
                    checked={selectedTypes.length === 0}
                    className="w-4 h-4 border-outline-variant text-primary focus:ring-primary rounded-sm"
                    onChange={() => setSelectedTypes([])}
                    type="checkbox"
                  />
                  <span>Tất cả đồ bé</span>
                </label>
                {typeOptions.map((type) => (
                  <label
                    className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"
                    key={type}
                  >
                    <input
                      checked={selectedTypes.includes(type)}
                      className="w-4 h-4 border-outline-variant text-primary focus:ring-primary rounded-sm"
                      onChange={() => handleTypeToggle(type)}
                      type="checkbox"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-label-uppercase text-label-uppercase text-primary mb-element-gap-md font-bold">
              Kích thước
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {availableSizes.map((size) => {
                const isActive = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`border rounded-full py-2 text-caption font-caption transition-all font-semibold ${
                      isActive
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-subtle hover:border-primary hover:text-primary bg-transparent text-on-surface'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-label-uppercase text-label-uppercase text-primary mb-element-gap-md font-bold">
              Màu sắc
            </h3>
            <div className="flex flex-wrap gap-3">
              {availableColors.map((color) => {
                const isActive = selectedColors.includes(color.hex);
                return (
                  <button
                    key={color.hex}
                    onClick={() => handleColorToggle(color.hex)}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border border-border-subtle ring-offset-2 hover:ring-2 ring-primary transition-all ${
                      isActive ? 'ring-2' : ''
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-label-uppercase text-label-uppercase text-primary mb-element-gap-md font-bold">
              Khoảng giá
            </h3>
            <div className="space-y-4">
              <input
                className="w-full accent-primary bg-surface-container h-1 rounded-lg cursor-pointer"
                max={defaultMaxPrice}
                min={minCatalogPrice}
                step="100000"
                type="range"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="flex justify-between text-caption font-caption text-ink-light font-medium">
                <span>{formatPrice(minCatalogPrice)}</span>
                <span>Tối đa: {formatPrice(maxPrice)}</span>
              </div>
            </div>
          </div>

          {(selectedTypes.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0 || maxPrice < defaultMaxPrice) && (
            <div className="pt-4 border-t border-border-subtle">
              <button
                onClick={() => {
                  setSelectedTypes([]);
                  setSelectedSizes([]);
                  setSelectedColors([]);
                  setMaxPrice(defaultMaxPrice);
                }}
                className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-full font-label-uppercase text-[11px] transition-all font-bold"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </aside>

        {/* Product Grid */}
        <div className="col-span-1 md:col-span-9">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-border-subtle pb-4">
            <span className="text-ink-light font-body-md text-body-md">
              Hiển thị {sortedProducts.length} trong số {categoryProducts.length} sản phẩm
            </span>
            <label className="flex items-center gap-2">
              <span className="font-label-uppercase text-label-uppercase text-on-surface">
                Sắp xếp:
              </span>
              <select
                className="bg-transparent border-none focus:ring-0 font-body-md text-body-md cursor-pointer text-primary"
                onChange={(e) => setSortOption(e.target.value)}
                value={sortOption}
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="popular">Phổ biến nhất</option>
              </select>
            </label>
          </div>

          {sortedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-grid-gutter gap-y-12">
                {sortedProducts.map((product) => (
                  <article className="product-card group" key={product.id}>
                    <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-element-gap-md bg-surface-container-low">
                      <Link className="block h-full" to={`/products/${product.id}`}>
                        <img
                          alt={product.name}
                          className="product-image w-full h-full object-cover transition-transform duration-700 ease-out"
                          src={product.image}
                        />
                        {product.badge && (
                          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-caption font-caption font-bold tracking-widest uppercase text-on-surface">
                            {product.badge}
                          </span>
                        )}
                      </Link>
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-white/85 backdrop-blur-md translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex justify-center pointer-events-none">
                        <button
                          className="bg-clay-dark text-white font-label-uppercase text-label-uppercase py-3 px-8 rounded-full hover:bg-primary transition-colors pointer-events-auto"
                          type="button"
                        >
                          Thêm nhanh
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-3">
                        <Link
                          className="font-body-lg text-body-lg text-on-surface group-hover:text-primary transition-colors"
                          to={`/products/${product.id}`}
                        >
                          {product.name}
                        </Link>
                        <button
                          aria-label={`Thêm ${product.name} vào yêu thích`}
                          className="material-symbols-outlined text-ink-light hover:text-error transition-colors"
                          type="button"
                        >
                          favorite
                        </button>
                      </div>
                      <p className="font-caption text-caption text-ink-light opacity-70">
                        {product.description}
                      </p>
                      <p className="font-body-md text-body-md font-bold text-clay-dark">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-section-gap-desktop flex justify-center items-center gap-4">
                <button className="w-10 h-10 rounded-full flex items-center justify-center border border-border-subtle hover:border-primary transition-colors group" type="button">
                  <span className="material-symbols-outlined text-on-surface group-hover:text-primary">chevron_left</span>
                </button>
                <div className="flex gap-2">
                  {[1, 2, 3].map((page) => (
                    <button
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-label-uppercase text-label-uppercase ${
                        page === 1
                          ? 'bg-primary text-white'
                          : 'border border-border-subtle hover:border-primary'
                      }`}
                      key={page}
                      type="button"
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button className="w-10 h-10 rounded-full flex items-center justify-center border border-border-subtle hover:border-primary transition-colors group" type="button">
                  <span className="material-symbols-outlined text-on-surface group-hover:text-primary">chevron_right</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border-subtle rounded-lg bg-white/40">
              <span className="material-symbols-outlined text-secondary text-5xl mb-4">
                sentiment_dissatisfied
              </span>
              <h3 className="font-headline-md text-headline-md mb-2 text-on-surface">
                Không tìm thấy sản phẩm
              </h3>
              <p className="font-body-md text-secondary max-w-sm">
                Vui lòng thử điều chỉnh lại phân loại, kích thước, màu sắc hoặc khoảng giá mong muốn trong thanh lọc.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-sage/20 py-section-gap-desktop w-full border-t border-border-subtle mt-12">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-element-gap-lg">
          <div className="max-w-xl">
            <h2 className="font-display text-headline-lg text-primary mb-4">Kết nối cùng Stitch</h2>
            <p className="font-body-md text-body-md text-ink-light">
              Nhận thông tin sớm nhất về các bộ sưu tập mới và các câu chuyện về thời trang bền vững của chúng tôi.
            </p>
          </div>
          <div className="w-full md:w-auto">
            {newsletterSuccess ? (
              <div className="bg-white border border-border-subtle px-8 py-4 rounded-full text-center flex items-center gap-2 shadow-sm font-body-md text-primary font-semibold">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                Cảm ơn bạn đã đăng ký!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  className="bg-transparent border-b-2 border-primary py-3 px-2 focus:outline-none focus:border-clay-dark font-body-md min-w-[300px]"
                  placeholder="Email của bạn"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button
                  className="bg-primary text-white px-10 py-4 rounded-full font-label-uppercase text-label-uppercase hover:bg-clay-dark transition-colors"
                  type="submit"
                >
                  Đăng ký
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


export const GENETIC_OPTIONS = {
  AML: [
    't(8;21)(q22;q22.1)',
    'inv(16)(p13.1q22)',
    't(16;16)(p13.1;q22)',
    't(9;11)(p21.3;q23.3)',
    't(6;9)(p22.3;q34.1)',
    'inv(3)(q21.3q26.2)',
    'NPM1 突变',
    'CEBPA-bZip',
    'FLT3-ITD',
    '复杂核型',
    'TP53 突变'
  ],
  ALL: [
    't(12;21) / ETV6-RUNX1',
    '超二倍体 (>50)',
    't(9;22) / BCR-ABL1',
    'Ph-Like ALL',
    't(1;19) / TCF3-PBX1',
    'IKZF1 缺失',
    'TCF3-HLF 重排'
  ],
  APL: [
    'PML-RARα 阳性',
    't(15;17)'
  ],
  CML: [
    'BCR-ABL1 阳性',
    'Ph 染色体阳性'
  ]
};

export const PROTOCOL_BRIEFS = {
  AML: "SCCCG-AML-2025: 强调精准分层。诱导方案随机分 IDA 组和 Lipo-MA 组。巩固方案包含 CDA + AraC。",
  ALL: "SCCCG-ALL-2023: 包含 LR, IR, HR 分层。LR 方案取消部分 VCR+Dex 维持，IR/HR 引入贝林妥欧单抗。",
  APL: "SCCCG-APL-2024: 全反式维甲酸 (ATRA) 联合砷剂 (RIF/ATO) 诱导，高危组加用 IDA/VEN。",
  CML: "SCCCG-CML-2023: 针对 TKI 治疗及 TFR (无治疗缓解) 的停药指南。首选尼洛替尼或达沙替尼。"
};

export const DETAILED_PROTOCOLS = [
  {
    id: 'AML-2025',
    title: 'SCCCG-AML-2025 方案',
    target: '初治儿童急性髓系白血病',
    updates: [
      '诱导治疗随机对照研究：IDA vs 脂质体米托蒽醌',
      '维奈克拉 (VEN) 的精准血药浓度监测 (TDM)',
      '基于 MRD 和基因重排的动态风险再分层'
    ],
    status: '现行'
  },
  {
    id: 'ALL-2023',
    title: 'SCCCG-ALL-2023 方案',
    target: '初治儿童急性淋巴细胞白血病',
    updates: [
      '低危组取消维持治疗中的 VCR/DEX 冲击',
      '高危/极高危组引入贝林妥欧单抗 (Blina)',
      '优化鞘内注射频率，减少神经系统损伤'
    ],
    status: '现行'
  },
  {
    id: 'APL-2024',
    title: 'SCCCG-APL-2024 方案',
    target: '初治儿童急性早幼粒细胞白血病',
    updates: [
      '无化疗诱导方案在非高危组的全面应用',
      '高危组 (WBC > 10) 联合 IDA 或维奈克拉',
      '分子生物学缓解 (PML-RARα) 的长期监测标准'
    ],
    status: '现行'
  }
];

export const COLLABORATIVE_UNITS = [
  {
    name: '中山大学附属第一医院',
    region: '广东·广州',
    role: '主席单位 / 组长单位',
    specialty: '血液肿瘤全流程管理'
  },
  {
    name: '中山大学孙逸仙纪念医院',
    region: '广东·广州',
    role: '副组长单位',
    specialty: '组织管理与数据协调'
  },
  {
    name: '广州市妇女儿童医疗中心',
    region: '广东·广州',
    role: '核心成员单位',
    specialty: 'ALL 临床研究中心'
  },
  {
    name: '南方医科大学南方医院',
    region: '广东·广州',
    role: '核心成员单位',
    specialty: '造血干细胞移植中心'
  },
  {
    name: '广西医科大学第一附属医院',
    region: '广西·南宁',
    role: '地区协调单位',
    specialty: '地中海贫血相关血液病'
  },
  {
    name: '海南省人民医院',
    region: '海南·海口',
    role: '成员单位',
    specialty: '综合诊疗'
  },
  {
    name: '香港大学玛丽医院',
    region: '香港',
    role: '国际交流协作单位',
    specialty: '基因诊断与精准医疗'
  }
];

export type ExperienceType = "校园基础" | "活动荣誉" | "创业实践" | "工作经历";

export type Experience = {
  type: ExperienceType;
  title: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    type: "校园基础",
    title: "学生阶段的技术与产品探索",
    organization: "校园经历待补充",
    period: "持续更新",
    summary: "以 AI 原生、软件开发和嵌入式开发为主线，持续建立自己的技术与产品认知。",
    highlights: ["学习 Agent 开发", "沉淀产品思考", "实践软件与嵌入式项目"],
  },
  {
    type: "创业实践",
    title: "OPC 个人创业探索",
    organization: "个人项目",
    period: "2026 - 至今",
    summary: "围绕 AI 原生应用寻找真实需求，尝试把想法推进为产品原型。",
    highlights: ["需求洞察", "MVP 验证", "内容与产品同步迭代"],
  },
  {
    type: "活动荣誉",
    title: "活动、比赛与荣誉",
    organization: "待补充",
    period: "后续更新",
    summary: "预留比赛、社团、奖项和实践活动记录。",
    highlights: ["比赛经历占位", "社团活动占位", "荣誉记录占位"],
  },
  {
    type: "工作经历",
    title: "实习与工作经历",
    organization: "待补充",
    period: "后续更新",
    summary: "预留实习、工作和合作项目经历。",
    highlights: ["岗位职责占位", "项目成果占位", "协作经验占位"],
  },
];

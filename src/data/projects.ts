export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "demo" | "docs" | "video" | "other";
};

export type Project = {
  slug: string;
  name: string;
  intro: string;
  problem: string;
  targetUsers: string;
  value: string;
  outcome: string;
  techStack: string[];
  status: "构思中" | "开发中" | "已上线" | "长期迭代";
  stage: string;
  releasedAt: string;
  featured: boolean;
  media: {
    cover: string;
    logo?: string;
    video?: string;
  };
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "ai-native-opc",
    name: "AI 原生 OPC 产品实验",
    intro: "围绕个人创业者的 AI 原生工作流，探索 Agent 如何从工具变成协作者。",
    problem: "个人创业者常常在想法、执行、复盘之间来回切换，信息分散且难以沉淀。",
    targetUsers: "关注 AI 原生应用的个人创业者、产品经理和独立开发者。",
    value: "把产品思考、任务推进和内容沉淀串成一条连续链路。",
    outcome: "首版以个人工作流原型和博客记录为主，后续补充真实 Demo 与数据。",
    techStack: ["Next.js", "TypeScript", "Agent", "Markdown"],
    status: "开发中",
    stage: "MVP 探索",
    releasedAt: "2026-05",
    featured: true,
    media: { cover: "/project-placeholder.svg" },
    links: [
      { label: "GitHub 占位", href: "#", kind: "github" },
      { label: "Demo 占位", href: "#", kind: "demo" },
    ],
  },
  {
    slug: "embedded-toolkit",
    name: "嵌入式开发工具箱",
    intro: "把嵌入式学习和调试经验整理成可复用工具与文章。",
    problem: "嵌入式学习资料零散，调试经验很难沉淀为可复用资产。",
    targetUsers: "嵌入式学习者、硬件项目实践者。",
    value: "用项目化方式整理知识，把经验变成清晰路径。",
    outcome: "第一阶段展示项目介绍，后续补充代码仓库、截图和实机演示。",
    techStack: ["C/C++", "MCU", "Python", "Docs"],
    status: "长期迭代",
    stage: "内容整理",
    releasedAt: "2026-05",
    featured: false,
    media: { cover: "/project-placeholder.svg" },
    links: [{ label: "资料占位", href: "#", kind: "docs" }],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

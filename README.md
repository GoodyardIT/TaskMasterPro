TaskMaster Pro - Production Task Management SystemA comprehensive web application for managing production task orders with real-time tracking, built with Next.js, Firebase, and Oracle Database integration.🚀 FeaturesCore Functionality

User Authentication: Secure login system using Firebase Authentication
Dynamic Task Management: Add, edit, and delete production task orders with validation
Excel Integration: Import/export functionality with .xlsx templates
Real-time Updates: Live submission history using Firestore listeners
Data Validation: Comprehensive validation including Oracle database checks
Multi-language Support: Chinese-first interface with internationalization ready
Technical Highlights

Automatic Work Order ID Generation: Format: UW[YYMMDD][NN]
Oracle ERP Integration: Validates material codes against WLXX table
Batch Operations: Submit multiple tasks simultaneously
Responsive Design: Optimized for desktop and mobile devices
AI-Powered Validation: Uses Genkit for intelligent data validation
🛠️ Tech StackFrontend

Next.js 15.3.3: React framework with App Router
TypeScript: Type-safe development
Tailwind CSS: Utility-first styling
Shadcn/ui: Modern component library
React Hook Form: Form state management
Zod: Schema validation
Backend

Firebase: Authentication & Firestore database
Oracle Database: ERP system integration
Firebase Admin SDK: Server-side operations
Next.js API Routes: Backend endpoints
AI/ML

Google Genkit: AI-powered data validation
Gemini 2.5 Flash: LLM for intelligent validation
📋 Prerequisites
Node.js 20+
npm or yarn
Firebase project
Oracle database access
Google AI API key (for Genkit)
🔧 Installation
Clone the repository

bashgit clone <repository-url>
cd taskmaster-pro
Install dependencies

bashnpm install
Configure environment variables
Create a .env.local file:
env# Firebase Admin Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Oracle Database Configuration
ORACLE_HOST=your-oracle-host
ORACLE_PORT=1521
ORACLE_SERVICE_NAME=orcl
ORACLE_USER=your-username
ORACLE_PASSWORD=your-password

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000

# Google AI (for Genkit)
GOOGLE_GENAI_API_KEY=your-api-key
Run development server

bashnpm run devOpen http://localhost:9002📁 Project Structuresrc/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── dashboard/      # Main application pages
│   │   └── page.tsx        # Login page
│   ├── actions/            # Server actions
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Reusable UI components
│   └── icons.tsx           # Custom icons
├── lib/
│   ├── firebase-config.ts  # Firebase client config
│   ├── oracle-config.ts    # Oracle DB connection
│   └── definitions.ts      # TypeScript types
├── ai/
│   └── flows/              # Genkit AI workflows
└── hooks/                  # Custom React hooks🔐 AuthenticationDefault credentials:

Username: GYGJ240328
Password: GYGJ240328hdy
The system uses a fixed mapping to Firebase Authentication email format.📊 Database SchemaOracle Table: WO (Work Orders)
sqlWO_WOID    VARCHAR2(20)  -- Work Order ID
WO_GCID    VARCHAR2(10)  -- Factory Code
WO_WLID    VARCHAR2(20)  -- Material Code
WO_XQSL    NUMBER        -- Quantity
WO_JHKGRQ  DATE          -- Planned Start Date
WO_JHWGRQ  DATE          -- Planned End Date
WO_BMID    VARCHAR2(10)  -- Department ID
WO_ZLH     VARCHAR2(30)  -- Manufacturing Order Number
WO_LX      VARCHAR2(10)  -- Type
WO_ZT      VARCHAR2(2)   -- Status (P/R/C)
WO_DZSC    VARCHAR2(2)   -- Electronic Upload
WO_BZ      VARCHAR2(200) -- Remarks
WO_WHRID   VARCHAR2(20)  -- Maintainer ID
WO_WHR     VARCHAR2(50)  -- Maintainer Name
WO_WHSJ    DATE          -- Maintenance Time🚀 DeploymentFirebase Hosting
bashnpm run build
firebase deployDocker
dockerfileFROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]🔍 Key Features DetailsWork Order ID Generation

Format: UW[YYMMDD][NN]
Example: UW25010401
Auto-increments daily sequence
Data Validation

Required field checks
Quantity must be > 0
Duplicate WOID prevention
Material code verification against Oracle WLXX table
AI-powered validation explanations
Excel Import/Export

Download template with predefined columns
Batch import from .xlsx files
Automatic date formatting
Data validation on import
🐛 TroubleshootingCommon Issues
Oracle Connection Failed

Check network connectivity
Verify Oracle credentials
Ensure Oracle service is running



Firebase Authentication Error

Verify Firebase configuration
Check API keys
Ensure Firebase project is active



Excel Import Issues

Use the provided template
Check date format (YYYY-MM-DD)
Ensure all required fields are filled


📝 LicenseProprietary - All rights reserved🤝 SupportFor support, please contact the development team.
----
TaskMaster Pro - 生产任务管理系统
一个综合性的生产任务订单管理Web应用，具有实时跟踪功能，基于 Next.js、Firebase 和 Oracle 数据库集成构建。
🚀 功能特性
核心功能

用户认证：使用 Firebase Authentication 的安全登录系统
动态任务管理：添加、编辑和删除生产任务订单，带验证功能
Excel 集成：导入/导出功能，支持 .xlsx 模板
实时更新：使用 Firestore 监听器的实时提交历史
数据验证：包括 Oracle 数据库检查的综合验证
多语言支持：以中文为主的界面，支持国际化

技术亮点

自动工单号生成：格式：UW[年月日][序号]
Oracle ERP 集成：根据 WLXX 表验证物料编码
批量操作：同时提交多个任务
响应式设计：针对桌面和移动设备优化
AI 驱动验证：使用 Genkit 进行智能数据验证

🛠️ 技术栈
前端

Next.js 15.3.3：带 App Router 的 React 框架
TypeScript：类型安全开发
Tailwind CSS：实用优先的样式
Shadcn/ui：现代组件库
React Hook Form：表单状态管理
Zod：模式验证

后端

Firebase：认证和 Firestore 数据库
Oracle 数据库：ERP 系统集成
Firebase Admin SDK：服务端操作
Next.js API Routes：后端端点

AI/ML

Google Genkit：AI 驱动的数据验证
Gemini 2.5 Flash：用于智能验证的大语言模型

📋 系统要求

Node.js 20+
npm 或 yarn
Firebase 项目
Oracle 数据库访问权限
Google AI API 密钥（用于 Genkit）

🔧 安装步骤

克隆仓库

bashgit clone <repository-url>
cd taskmaster-pro

安装依赖

bashnpm install

配置环境变量

创建 .env.local 文件：
env# Firebase 管理配置
FIREBASE_PROJECT_ID=你的项目ID
FIREBASE_CLIENT_EMAIL=你的客户端邮箱
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Oracle 数据库配置
ORACLE_HOST=你的Oracle主机
ORACLE_PORT=1521
ORACLE_SERVICE_NAME=orcl
ORACLE_USER=你的用户名
ORACLE_PASSWORD=你的密码

# Next.js 配置
NEXTAUTH_URL=http://localhost:3000

# Google AI (用于 Genkit)
GOOGLE_GENAI_API_KEY=你的API密钥

运行开发服务器

bashnpm run dev
```

打开 [http://localhost:9002](http://localhost:9002)

## 📁 项目结构
```
src/
├── app/
│   ├── [locale]/          # 国际化路由
│   │   ├── dashboard/      # 主应用页面
│   │   └── page.tsx        # 登录页面
│   ├── actions/            # 服务器操作
│   └── api/                # API 路由
├── components/
│   ├── ui/                 # 可重用 UI 组件
│   └── icons.tsx           # 自定义图标
├── lib/
│   ├── firebase-config.ts  # Firebase 客户端配置
│   ├── oracle-config.ts    # Oracle 数据库连接
│   └── definitions.ts      # TypeScript 类型
├── ai/
│   └── flows/              # Genkit AI 工作流
└── hooks/                  # 自定义 React 钩子
🔐 认证
默认凭据：

用户名: GYGJ240328
密码: GYGJ240328hdy

系统使用固定映射到 Firebase Authentication 邮箱格式。
📊 数据库架构
Oracle 表：WO（工作订单）
sqlWO_WOID    VARCHAR2(20)  -- 生产任务单号
WO_GCID    VARCHAR2(10)  -- 工厂代码
WO_WLID    VARCHAR2(20)  -- 物料编码
WO_XQSL    NUMBER        -- 需求数量
WO_JHKGRQ  DATE          -- 计划开工日期
WO_JHWGRQ  DATE          -- 计划完工日期
WO_BMID    VARCHAR2(10)  -- 部门ID
WO_ZLH     VARCHAR2(30)  -- 制令号
WO_LX      VARCHAR2(10)  -- 类型
WO_ZT      VARCHAR2(2)   -- 状态 (P计划/R发布/C完成)
WO_DZSC    VARCHAR2(2)   -- 电子上传
WO_BZ      VARCHAR2(200) -- 备注
WO_WHRID   VARCHAR2(20)  -- 维护人ID
WO_WHR     VARCHAR2(50)  -- 维护人姓名
WO_WHSJ    DATE          -- 维护时间
🚀 部署
Firebase Hosting
bashnpm run build
firebase deploy
Docker
dockerfileFROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
🔍 关键功能详解
工单号生成

格式：UW[年月日][序号]
示例：UW25010401
每日序号自动递增

数据验证

必填字段检查
数量必须大于 0
防止重复的工单号
根据 Oracle WLXX 表验证物料编码
AI 驱动的验证说明

Excel 导入/导出

下载预定义列的模板
从 .xlsx 文件批量导入
自动日期格式化
导入时数据验证

🐛 故障排除
常见问题

Oracle 连接失败

检查网络连接
验证 Oracle 凭据
确保 Oracle 服务正在运行


Firebase 认证错误

验证 Firebase 配置
检查 API 密钥
确保 Firebase 项目处于活动状态


Excel 导入问题

使用提供的模板
检查日期格式（YYYY-MM-DD）
确保所有必填字段都已填写



📝 许可证
专有软件 - 保留所有权利
🤝 支持
如需支持，请联系开发团队。
🔄 更新日志
v1.0.0 (2025-01-04)

初始版本发布
核心功能实现
Oracle 数据库集成
AI 验证功能


开发团队 | 2025年 | TaskMaster Pro

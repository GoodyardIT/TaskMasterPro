# Goodyard TaskMaster Pro - 生产工单管理系统

Goodyard TaskMaster Pro 是一款现代化的全栈 Web 应用程序，专为生产工单的创建与管理而设计。它集成了 Oracle ERP 系统进行数据验证与提交，利用 Firebase 实现实时数据存储和身份验证，并使用 Generative AI 提供智能数据验证辅助。

## 核心功能

- **安全身份验证**：采用 Firebase Authentication 实现安全的登录系统。
- **直观数据录入**：用户可以通过简洁的表格界面逐行手动添加生产任务。
- **AI 驱动的验证**：集成 Genkit AI 流，在提交前实时检查数据的完整性和唯一性。
- **Excel 导入/导出**：支持下载模板并批量导入任务，自动生成工单 ID。
- **Oracle ERP 集成**：通过安全云代理与 Oracle 数据库通信，验证物料编码（WO_WLID）并提交最终工单。
- **实时提交历史**：专用历史页面使用 Firestore 实时显示所有已提交任务的状态和详情。
- **多语言支持**：界面支持中文和英文切换。

## 技术栈

- **框架**: Next.js (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件**: ShadCN UI
- **AI 框架**: Google Genkit
- **实时数据库**: Google Firestore
- **身份验证**: Firebase Authentication
- **部署**: Firebase App Hosting

## 快速开始

### 本地运行

1. **安装依赖**:
   ```bash
   npm install
   ```

2. **配置环境变量**:
   创建 `.env.local` 文件，参考项目根目录的配置填入 Firebase 和 Oracle 代理的凭据。

3. **启动开发服务器**:
   ```bash
   npm run dev
   ```

4. **启动 Genkit 开发工具**:
   ```bash
   npm run genkit:watch
   ```

访问 `http://localhost:9002` 即可预览应用。

---
© 2025 Goodyard IT. 版权所有。

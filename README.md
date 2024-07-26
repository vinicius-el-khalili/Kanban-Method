# Demo

 - https://kanban-method.vercel.app/


### User Authentication API

- [x] Register: POST /api/users/signup
- [x] Login: POST /api/users/signin

### Project Management API

- [x] Get All Projects: GET /api/projects
- [x] Create Project: POST /api/projects
- [x] Get All Projects by User: GET /api/projects/user/[userID]
- [x] Get Project by ID: GET /api/projects/project/[projectID]
- [x] Update Project: PATCH /api/projects/project/[projectID]
- [x] Delete Project: DELETE /api/projects/project/[projectID]
- [x] Get Tasks by Project: GET /api/projects/project/[projectID]/tasks

### Task Management API

- [x] Create Task: POST /api/tasks/
- [x] Get Task by ID: GET /api/tasks/[taskID]
- [x] Patch Task: PATCH /api/tasks/[taskID]
- [x] Delete Task: DELETE /api/tasks/[taskID]

### Zustand Contexts

- [x] Zustand Auth store
- [x] Zustand Project store
- [x] Zustand Task store

### Pages

- [x] Home page
- [x] Sign In page
- [x] Sign Up page
- [x] Layouts
- [x] Dashboard page
- [x] Project page

### Contribution Management: Update Models & Schemas

- [x] Update User Schema
- [x] Update User operations
- [x] Update Project Schema
- [x] Update Project operations
- [x] Update Task Schema
- [x] Update Task operations

### Project Contribution Management

- [x] Add contributor to Project: PATCH /api/projects/project/[projectID]
- [x] Add contributor to Project: PATCH ProjectStore
- [x] Get User Contributor object: GET /api/users/[userID]
- [x] Add contributor to Project: UI
- [x] Add/Remove contributor to Task: PATCH /api/tasks/[taskID]
- [ ] Show shared projects @ Projects page

### Task Assignment Management

- [ ] Add/Remove contributor to Task: ProjectStore
- [ ] Add/Remove contributor to Task: UI
- [ ] Add/Remove contributor to Task: PATCH /api/tasks/[taskID]
- [ ] Add/Remove contributor to User friends list: PATCH /api/users/[userID]
- [ ] Add/Remove contributor to User friends list: User Store
- [ ] Add/Remove contributor to User friends list: UI

.
├── projects
│   ├── project
│   │   └── [projectId]
│   │       ├── route.ts (*)
│   │       └── tasks
│   │           └── route.ts *
│   ├── route.ts *
│   └── user 
│       └── [userId]
│           └── route.ts *
├── tasks 
│   ├── route.ts *
│   └── [taskId]
│       └── route.ts *
└── users
    ├── refresh
    │   └── route.ts (*)
    ├── search
    │   └── [login]
    │       └── route.ts *
    ├── signin
    │   └── route.ts
    ├── signup
    │   └── route.ts
    └── [userID]
        └── route.ts *


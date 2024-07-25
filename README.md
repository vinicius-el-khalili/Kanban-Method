# Demo

 - https://kanban-method.vercel.app/

# Back

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
- [x] Update Task: PATCH /api/tasks/[taskID]
- [x] Delete Task: DELETE /api/tasks/[taskID]

### Contribution Management

- [x] Update User Schema
- [x] Update User operations
- [x] Update Project Schema
- [x] Update Project operations
- [x] Update Task Schema
- [x] Update Task operations

- [x] Add/Remove contributer to Project: PATCH /api/tasks/[taskID]
- [ ] Add/Remove contributer to Project: ProjectStore
- [x] Add/Remove contributer to Task: PATCH /api/tasks/[taskID]
- [ ] Add/Remove contributer to Task: ProjectStore

- [ ] Add colaborator to Task
- [ ] Remove colaborator from Task

# Front

### Context

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
# Back

### User Authentication

- [x] Register: POST /api/users/signup
- [x] Login: POST /api/users/signin

### Project Management

- [x] Get All Projects: GET /api/projects
- [x] Create Project: POST /api/projects
- [x] Get All Projects by User: GET /api/projects/user/[userId]
- [x] Get Project by ID: GET /api/projects/project/[projectId]
- [x] Update Project: PATCH /api/projects/project/[projectId]
- [x] Delete Project: DELETE /api/projects/project/[projectId]
- [x] Get Tasks by Project: GET /api/projects/project/[projectId]/tasks

### Task Management

- [x] Create Task: POST /api/tasks/
- [x] Get Task by ID: GET /api/tasks/[taskId]
- [x] Update Task: PATCH /api/tasks/[taskId]
- [x] Delete Task: DELETE /api/tasks/[taskId]

# Front

### Context

- [ ] Zustand Auth store
- [ ] Zustand Project store
- [ ] Zustand Task store

### Pages & Components

- #### [ ] Home page
    - [ ] minimalist stuff?
- #### [ ] Sign In page
    - [ ] Sign In form
- #### [ ] Sign Up page
    - [ ] Sign Up form
- #### [ ] Layout
    - [ ] Navbar/Drawer
    - [ ] Containers
- #### [ ] Dashboard
    - [ ] Project Cards
- #### [ ] Project
    - [ ] Containers
    - [ ] Task Cards
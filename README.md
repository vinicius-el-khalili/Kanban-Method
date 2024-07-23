### Api paths

#### User Authentication

- Register: POST /api/users/signup
- Login: POST /api/users/signin

#### Project Management

 - Get All Projects: GET /api/projects
 - Create Project: POST /api/projects
 - Get All Projects for a User: GET /api/projects/user/[userId]
 - Get Project by ID: GET /api/projects/project/[projectId]

 - Update Project: PUT /api/projects/:projectId
 - Delete Project: DELETE /api/projects/:projectId
 - Add Contributor to Project: POST /api/projects/:projectId/contributors
 - Remove Contributor from Project: DELETE /api/projects/:projectId/contributors/:userId

#### Task Manager

 - Create Task: POST /api/tasks/


 - Get All Tasks for a Project: GET /api/projects/:projectId/tasks
 - Get Task by ID: GET /api/projects/:projectId/tasks/:taskId
 - Update Task: PUT /api/projects/:projectId/tasks/:taskId
 - Delete Task: DELETE /api/projects/:projectId/tasks/:taskId

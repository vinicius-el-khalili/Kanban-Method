### Api paths

#### User Authentication

Done:

- Register: POST /api/users/signup
- Login: POST /api/users/signin

To do:

#### Project Management

Done:

 - Get All Projects: GET /api/projects
 - Create Project: POST /api/projects
 - Get All Projects by User: GET /api/projects/user/[userId]
 - Get Project by ID: GET /api/projects/project/[projectId]

Doing:

 - Update Project: PUT /api/projects/project/[projectId]

To do:

 - Delete Project: DELETE /api/projects/:projectId
 - Add Contributor to Project: POST /api/projects/:projectId/contributors
 - Remove Contributor from Project: DELETE /api/projects/:projectId/contributors/:userId

#### Task Manager

Done:

 - Create Task: POST /api/tasks/

To do:
 - Get All Tasks for a Project: GET /api/projects/:projectId/tasks
 - Get Task by ID: GET /api/projects/:projectId/tasks/:taskId
 - Update Task: PUT /api/projects/:projectId/tasks/:taskId
 - Delete Task: DELETE /api/projects/:projectId/tasks/:taskId

# **Company Task Management MERN stack**

Our studios is in need of a simple task management web app that allows our team managers and their team members to create and manage their tasks. The app is designed to help individuals and teams stay organized and on track with their daily tasks and projects.

# User Stories

## Manager

1. As a manager, I want to be able to invite new team members to set up their account.
2. As a manager, I want to be able to create and assign tasks to specific team members.
3. As a manager, I want to be able to provide description, set priorities, and deadlines for each task.
4. As a manage, I want to be able to create projects that group related tasks together.
5. As a manager, I want to be able to view my team's tasks by assignee, by status, by project, and by priority.
6. As a manager, I want to be able to monitor task progress, and update tasks as needed.
7. As a manager, I want to be able to receive notification and reminders related to the tasks I created.

## Team Member

1. As a team member, I want to be able set up my account through invitation.
2. As a team member, I want to be able to log in/out of my account
3. As a team member, I want to be able to view my assigned tasks, deadlines, and priorities in one place.
4. As a team member, I want to be able to receive notification and reminders related to my tasks
5. As a team member, I want to be able to update the status of my tasks, mark them as complete, and provide comments or notes as necessary.
6. As a team member, I want to be able to collaborate with my team members by sharing files or resources related to the tasks.

# Features and Specifications

## User Authentication

- [x] Manager can create an account and log in/ out of the manager’s app
- [x] Team members cannot register by themselves, but need manager’s email invitation to set up their account.
- [x] After initial setup, team members can login/out of the app using their credentials.

## Task Management

- [x] Manager can create a project with title, description, and add tasks to it.
- [x] Manager can create new tasks by entering a title, description, and selecting a project or category.
- [x] Manager can view projects, tasks in different views (by project, by assignee, by status,…).
- [x] Manager can assign tasks to themselves or to team members by selecting from a list of users.
- [x] Manager can add priority, deadline to the task.
- [x] Team member can view all their assigned tasks in one place.
- [x] Team member can assign task to themselves if the created task doesn’t have an assignee.
- [x] Team member can update the status of their assigned task as they progress.

## Team Collaboration

- [x] Team member can view other members’ tasks
- [x] Team member and manager can leave comments on other members tasks

## Reminder & Notification

- [x] Manager can receive email and/or in app notification about task status update by team member
- [x] Team member can receive receive email and/or in app notification about changes made by their manager to their tasks

# Endpoint APIs

## Auth APIs

```javascript
/**
 * @route POST /auth/login
 * @description Login with email and password
 * @body {email, password}
 * @access Public
 */
```

## User APIs

```javascript
/**
 * @route POST /users/invitation
 * @description Send invitation to set up account
 * @body { email}
 * @access Manager login required
 */
```

```javascript
/**
 * @route POST /users/forgotPassword
 * @description create new password with registed email
 * @body {email}
 * @access Public
 */
```

```javascript
/**
 * @route PUT /users/resetPassword
 * @description reset password with registed email
 * @body {email, newPassword}
 * @access Public
 */
```

## Project APIs

```javascript
/**
 * @route Get /projects/?page=1&limit=10
 * @description get list of projects
 * @access Manager login required
 */
```

```javascript
/**
 * @route POST /projects
 * @description create a project
 * @body {title, description, tasks}
 * @access Manager login required
 */
```

```javascript
/**
 * @route PUT /projects/:projectId
 * @description update a project
 * @body {title, description, tasks}
 * @access Manager login required
 */
```

## Task APIs

```javascript
/**
 * @route POST /tasks
 * @description create a task
 * @body {title, description, project}
 * @access Manager login required
 */
```

```javascript
/**
 * @route GET /tasks/:userId?page=1&limit=10
 * @description get list of tasks user can see with pagination
 * @body {project,assignee,status}
 * @access login required
 */
```

```javascript
/**
 * @route GET /tasks/assignee/:userId
 * @description get list of tasks of assignee
 * @body {assigneeId}
 * @access login required
 */
```

```javascript
/**
 * @route PUT /tasks/assign/:userId
 * @description user assign task to themselves ,only manager can assign to team members
 * @body {assigneeIds}
 * @access login required
 */
```

```javascript
/**
 * @route PUT /tasks/update/:userId
 * @description add priority, deadline
 * @body {taskId, priority, deadline}
 * @access Manager login required
 */
```

```javascript
/**
 * @route PUT /tasks/status/:userId
 * @description add priority, deadline
 * @body {taskId, status}
 * @access login required
 */
```

```javascript
/**
 * @route PUT /tasks/comments/:taskId
 * @description add comment to task
 * @body {userId, body}
 * @access login required
 */
```

## Notification APIs

```javascript
/**
 * @route GET /notification/:userId?page=1&limit=10
 * @description get list of notification user can see with pagination
 * @access login required
 */
```

```javascript
/**
 * @route POST /notification/:taskId
 * @description post a notification
 * @body {taskId , status, contents}
 * @access login required
 */
```

## Project Member APIs

```javascript
/**
 * @route GET /projectMember/:userId?page=1&limit=10
 * @description get list of projects that user take part in
 * @access login required
 */
```

```javascript
/**
 * @route GET /projectMember/:projectId?page=1&limit=10
 * @description get list of members take part in this project
 * @access manager login required
 */
```

```javascript
/**
/**
 * @route PUT /projects/comments/:projectId
 * @description add comment in project
 * @body {userId, body}
 * @access login required
 */
```

# Entity Relationship Diagram

![Alt text](./final-project.svg)

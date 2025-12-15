import { Routes } from '@angular/router';

import { authGuard } from './Core/Guards/auth.guard';
import { assistantGuard } from './Core/Guards/assistant.guard';
import { studentGuard } from './Core/Guards/student.guard';
import { doctorGuard } from './Core/Guards/doctor.guard';

import { MainComponent } from './Shared/Components/main/main.component';
import { adminGuard } from './Core/Guards/admin.guard';
import { guestGuard } from './Core/Guards/guest.guard';

export const routes: Routes = [
  /* =========================
     Auth
  ========================== */
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./Features/Auth/Components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  /* =========================
     Main Layout Routes
  ========================== */
  {
    path: 'main',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      /* -------- Home -------- */
      {
        path: 'home',
        title: 'Home',
        loadComponent: () =>
          import('./Shared/Components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },

      /* -------- Auth -------- */
      {
        path: 'change-password',
        title: 'Change Password',
        loadComponent: () =>
          import(
            './Features/Auth/Components/change-password/change-password.component'
          ).then((m) => m.ChangePasswordComponent),
      },

      /* =========================
         Export Templates
      ========================== */
      {
        path: 'template-students/:subjectId',
        title: 'Template Students',
        canActivate: [assistantGuard],
        loadComponent: () =>
          import(
            './Features/ExportTemplates/components/template-students/template-students.component'
          ).then((m) => m.TemplateStudentsComponent),
      },
      {
        path: 'template-grades/:subjectId',
        title: 'Template Grades',
        canActivate: [assistantGuard],
        loadComponent: () =>
          import(
            './Features/ExportTemplates/components/template-grades/template-grades.component'
          ).then((m) => m.TemplateGradesComponent),
      },
      {
        path: 'template-students-grades/:subjectId',
        title: 'Template Students & Grades',
        canActivate: [assistantGuard],
        loadComponent: () =>
          import(
            './Features/ExportTemplates/components/template-students-grades/template-students-grades.component'
          ).then((m) => m.TemplateStudentsGradesComponent),
      },

      /* =========================
         Subjects
      ========================== */
      {
        path: 'my-subjects',
        title: 'My Subjects', 
        loadComponent: () =>
          import('./Features/Subjects/my-subjects/my-subjects.component').then(
            (m) => m.MySubjectsComponent
          ),
      },
      {
        path: 'subject/:subjectId',
        title: 'Subject Info',
        loadComponent: () =>
          import(
            './Features/Subjects/subject-info/subject-info.component'
          ).then((m) => m.SubjectInfoComponent),
      },

      /* =========================
         User Management
      ========================== */
      {
        path: 'add-doctors',
        title: 'Add Doctors',
        canActivate: [adminGuard],
        loadComponent: () =>
          import(
            './Features/Users/Components/Doctor/add-doctors/add-doctors.component'
          ).then((m) => m.AddDoctorsComponent),
      },
      {
        path: 'add-students',
        title: 'Add Students',
        canActivate: [adminGuard],
        loadComponent: () =>
          import(
            './Features/Users/Components/Student/add-students/add-students.component'
          ).then((m) => m.AddStudentsComponent),
      },
      {
        path: 'add-assistants',
        title: 'Add Assistants',
        canActivate: [adminGuard],
        loadComponent: () =>
          import(
            './Features/Users/Components/Assistant/add-assistants/add-assistants.component'
          ).then((m) => m.AddAssistantsComponent),
      },

      //#region Profiles
      {
        path: 'profile',
        title: 'Student Profile',
        canActivate: [studentGuard],
        loadComponent: () =>
          import(
            './Features/Users/Components/Student/profile/profile.component'
          ).then((m) => m.ProfileComponent),
      },

      {
        path: 'profile-assistant',
        title: 'Assistant Profile',
        canActivate: [assistantGuard],
        loadComponent: () =>
          import(
            './Features/Users/Components/Assistant/profile/profile.component'
          ).then((m) => m.ProfileComponent),
      },
      {
        path: 'profile-doctor',
        title: 'Doctor Profile',
        canActivate: [doctorGuard],
        loadComponent: () =>
          import(
            './Features/Users/Components/Doctor/profile/profile.component'
          ).then((m) => m.ProfileComponent),
      },
      //#endregion
      /* =========================
         Grades
      ========================== */
      {
        path: 'my-grades',
        title: 'My Grades',
        canActivate: [studentGuard],
        loadComponent: () =>
          import(
            './Features/Grades/Components/my-grades/my-grades.component'
          ).then((m) => m.MyGradesComponent),
      },
      {
        path: 'students-grades/:subjectId',
        title: 'Students Grades',
        loadComponent: () =>
          import(
            './Features/Grades/Components/students-grades/students-grades.component'
          ).then((m) => m.StudentsGradesComponent),
      },

      /* =========================
         Import Grades
      ========================== */
      {
        path: 'import-grades/:subjectId',
        title: 'Import Grades',
        canActivate: [assistantGuard],
        loadComponent: () =>
          import(
            './Features/Grades/Components/importgrades/importgrades.component'
          ).then((m) => m.ImportgradesComponent),
      },
    ],
  },

  /* =========================
     Not Found
  ========================== */
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./Shared/Components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];

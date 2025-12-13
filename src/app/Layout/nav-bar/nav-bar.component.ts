import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { AuthServiceService } from '../../Features/Auth/Services/auth-service.service';
import { APIStudentService } from '../../Features/Users/Services/apistudent.service';
import { APIAssistantService } from '../../Features/Users/Services/apiassistant.service';
import { authGuard } from '../../Core/Guards/auth.guard';
import { APIDoctorService } from '../../Features/Users/Services/apidoctor.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    RouterLink,
    InputTextModule,
    AvatarModule,
    BadgeModule,
    RippleModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  logOut: boolean = false;
  username: string = '';
  usernameAssistant: string = '';
  usernameDoctor: string = '';
  mobileOpen = false;
  darkMode = false;
  usernameAdmin: string = '';

  constructor(
    private router: Router,
    private _auth: AuthServiceService,
    private studentService: APIStudentService,
    private assistantService: APIAssistantService,
    private doctorService: APIDoctorService
  ) {}

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }

    const nationalId = localStorage.getItem('nationalId');

    if (!nationalId) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadUserData(nationalId);
    this.buildMenu();
  }
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  private enableDarkMode() {
    this.darkMode = true;
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }

  private disableDarkMode() {
    this.darkMode = false;
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }

  private loadUserData(nationalId: string) {
    if (this.isStudent()) {
      this.studentService.getStudentDetails(nationalId).subscribe({
        next: (data) => {
          this.username = data.fullName;
          localStorage.setItem('studentId', data.id.toString());
        },
      });
    }

    if (this.isAssistant()) {
      this.assistantService.getAssistantDetails(nationalId).subscribe({
        next: (data) => {
          this.usernameAssistant = data.fullName;
          localStorage.setItem('assistantId', data.id.toString());
        },
      });
    }

    if (this.isDoctor()) {
      this.doctorService.getDoctorDetails(nationalId).subscribe({
        next: (data) => {
          this.usernameDoctor = data.fullName;
          localStorage.setItem('doctorId', data.id.toString());
        },
      });
    }
  }

  private buildMenu() {
    // روابط مشتركة
    const homeItem: MenuItem = {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: ['/main/home'],
    };

    /* =========================
     Admin Menu
  ========================== */
    if (this.isAdmin()) {
      this.items = [
        homeItem,
        {
          label: 'Add Doctors',
          icon: 'pi pi-user-plus',
          routerLink: ['/main/add-doctors'],
        },
        {
          label: 'Add Students',
          icon: 'pi pi-users',
          routerLink: ['/main/add-students'],
        },
        {
          label: 'Add Assistants',
          icon: 'pi pi-id-card',
          routerLink: ['/main/add-assistants'],
        },
      ];
      return;
    }

    /* =========================
     Assistant Menu
  ========================== */
    if (this.isAssistant()) {
      this.items = [
        homeItem,
        {
          label: 'My Subjects',
          icon: 'pi pi-book',
          routerLink: ['/main/my-subjects'],
        },
      ];
      return;
    }

    /* =========================
     Student Menu
  ========================== */
    if (this.isStudent()) {
      this.items = [
        homeItem,
        {
          label: 'My Grades',
          icon: 'pi pi-chart-bar',
          routerLink: ['/main/my-grades'],
        },
      ];
      return;
    }

    /* =========================
     Doctor Menu
  ========================== */
    if (this.isDoctor()) {
      this.items = [
        homeItem,
        {
          label: 'My Subjects',
          icon: 'pi pi-briefcase',
          routerLink: ['/main/my-subjects'], // فيك – عدله بعدين
        },
      ];
      return;
    }

    this.items = [homeItem];
  }

  isActive(item: any): boolean {
    try {
      const url = this.router.url;
      if (!item.routerLink) return false;
      const path = Array.isArray(item.routerLink)
        ? item.routerLink.join('/')
        : item.routerLink;
      return url.includes(path.replace(/^\//, ''));
    } catch {
      return false;
    }
  }

  isAdmin(): boolean {
    return this._auth.isAdmin();
  }

  isAssistant(): boolean {
    return this._auth.isAssistant();
  }
  isStudent(): boolean {
    return this._auth.isStudent();
  }
  isDoctor(): boolean {
    return this._auth.isDoctor();
  }
  isAuthenticated(): boolean {
    return this._auth.isAuthenticated();
  }

  logout(): void {
    this._auth.logout().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}

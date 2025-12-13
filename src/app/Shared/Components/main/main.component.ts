import { Component } from '@angular/core';
import { NavBarComponent } from '../../../Layout/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../Layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}

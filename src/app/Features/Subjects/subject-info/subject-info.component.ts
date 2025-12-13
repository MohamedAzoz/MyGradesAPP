import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-subject-info',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './subject-info.component.html',
  styleUrl: './subject-info.component.scss',
})
export class SubjectInfoComponent implements OnInit {
  subjectId!: number;
  isAssistant: boolean = false;
  isDoctor: boolean = false;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const subjectIdParam = this.route.snapshot.paramMap.get('subjectId');
    if (subjectIdParam) {
      this.subjectId = Number(subjectIdParam);
    } else {
      // Handle the case where subjectId is not provided in the route
      console.error('Subject ID is missing in the route parameters.');
      window.location.href = '/main/my-subjects'; // Redirect to a safe page
    }
    this.isAssistant = !!localStorage.getItem('assistantId');
    this.isDoctor = !!localStorage.getItem('doctorId');
  }
}

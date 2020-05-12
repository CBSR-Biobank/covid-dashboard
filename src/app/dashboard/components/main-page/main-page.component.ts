import { Component, OnInit } from '@angular/core';
import { Report } from '@app/models';
import { PatientsService } from '@app/services/patients.service';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  isLoggedIn = false;
  report: Report;

  menu: NbMenuItem[] = [
    {
      title: 'Patients',
      icon: 'people-outline'
      //link: '/pages/iot-dashboard'
    }
  ];

  constructor(private accessChecker: NbAccessChecker, private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.accessChecker
      .isGranted('edit', 'user')
      .pipe(takeUntil(this.destroy$))
      .subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      });

    this.patientsService
      .reports()
      .pipe(takeUntil(this.destroy$))
      .subscribe((report: any) => {
        this.report = new Report().deserialize(report);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

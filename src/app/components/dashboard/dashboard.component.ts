import { Component } from '@angular/core';
import {RouterOutlet , RouterModule} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

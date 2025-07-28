import { Component } from '@angular/core';
import { Login} from '../login/login';
import { Register } from '../register/register';

@Component({
  standalone: true,
  selector: 'app-intro',
  imports: [Login, Register],
  templateUrl: './intro.html',
  styleUrls: ['./intro.css']
})
export class Intro{

}

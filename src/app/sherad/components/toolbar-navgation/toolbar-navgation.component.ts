import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navgation',
  templateUrl: './toolbar-navgation.component.html',
})
export class ToolbarNavgationComponent {

  constructor(private cookie: CookieService, private router: Router){}

  handleLogout():void{
    this.cookie.delete('USER_INFO');
    void this.router.navigate(['/home'])
  }
}

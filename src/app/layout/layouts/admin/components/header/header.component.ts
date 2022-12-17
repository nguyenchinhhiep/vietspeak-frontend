import { Component, OnInit } from '@angular/core';
import { NavigationComponentService } from 'src/app/components/navigation/navigation.service';
import { VerticalNavigationComponent } from 'src/app/components/navigation/vertical/vertical.component';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  
  constructor(
    private _navigationComponentService: NavigationComponentService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Toggle the navigation
   */
   toggleNavigation(){
    const navigation = this._navigationComponentService.getComponent<VerticalNavigationComponent>('adminNavigation')
    if(navigation){
      navigation.toggle()
    }
   }

}

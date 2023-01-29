import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('wishInput') wishInput: ElementRef;

 gotResponse: boolean = false;
 formSubmitted: boolean = false;
 reactiveForm: FormGroup;
 wishes = [];
 
 constructor(private http: HttpClient) {}

 ngOnInit() {
  this.reactiveForm = new FormGroup( {
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    wishes: new FormControl(null)

  });
 }

 addWish() {
  const wish = this.wishInput.nativeElement.value.trim();

  if(!wish) {
    alert("Prosim dodajte željo")
  } 
  else if(this.wishes.length < 5) {
  this.wishes.push(this.wishInput.nativeElement.value);
  this.wishInput.nativeElement.value = '';
  }
  else {
  alert('Maksimalno Število Želja je 5')
   }
  }


removeWish(index: number) {
  this.wishes.splice(index, 1);
}



submit() {
  if(!this.wishes.length) {
    alert("Prosim dodajte kakšno željo.")
    return;
  } 

  this.reactiveForm.setValue({
    firstName: this.reactiveForm.value.firstName,
    lastName: this.reactiveForm.value.lastName,
    wishes: this.wishes
  });

  let formObj = this.reactiveForm.getRawValue();
  let serializedForm = JSON.stringify(formObj);
  this.formSubmitted = true;

  this.http.post('https://bozicek.com', serializedForm).subscribe(
  (response) => {
    console.log(response);
   
    this.gotResponse = true;
  },
  (error) => {
    console.log(error);
    this.gotResponse = true;
  }
);
}


}

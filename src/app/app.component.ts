import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  
  rForm: FormGroup;
  post:any;                // for the submitted form
  description:string = '';
  name:string = '';
  titleAlert:string = "This is Required";
  constructor(private fb: FormBuilder) {

    this.rForm = fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(200)])],
      'validate' : ''
    });

    console.log(this.rForm)

  }

    ngOnInit() {
      this.rForm.get('validate').valueChanges.subscribe(
        (validate) => {
          if (validate == '1') {
            this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
            this.titleAlert = "You Need to put at leat 3 chars";
          } else {
            this.rForm.get('name').setValidators(Validators.required);
          }
        this.rForm.get('name').updateValueAndValidity();
        }
      )

    }

  addPost(post){
    this.description = post.description;
    this.name = post.name;
  }

}



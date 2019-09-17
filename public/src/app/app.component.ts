import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { DomElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Pokemon';
  tasks = {}
  newTask: any;
  updateTask: any
  editClicked: Boolean = false
  editTask = {}
  updateTaskId: String
  // sharedPokemon = []
  // pokeId = 0
  // pokeClicked = false

  constructor(private _httpService: HttpService) {
  }

  ngOnInit(): void {
    this.newTask = { title: "", description: "" }
    this.updateTask = { title: "", description: "" }
    this.getTasksFromService();
  }

  getTasksFromService() {
    // calling our get Pokemon method and receive an observable
    let observable = this._httpService.getTasks()
    observable.subscribe(data => {
      this.tasks = data
    })
  }

  onSubmit() {
    // Code to send off the form data (this.newTask) to the Service
    let observable = this._httpService.addTask(this.newTask);
    // Reset this.newTask to a new, clean object.
    observable.subscribe(data => {
      console.log('gottem', data)
      this.newTask = { title: "", description: "" }
      this.getTasksFromService();
    })
  }

  updateTheTask() {
     // Code to send off the form data (this.newTask) to the Service
     let observable = this._httpService.update(this.updateTaskId, this.updateTask);
     // Reset this.newTask to a new, clean object.
     observable.subscribe(data => {
     })
     this.updateTask = { title: "", description: "" }
       this.getTasksFromService();
  }

  onButtonClickParam(id) { 
    console.log(id)
    let self = this
    let observable = this._httpService.deleteTask(id);
    // Reset this.newTask to a new, clean object.
    observable.subscribe(data => {
    })
    this.getTasksFromService()
  }

   editMe(id) {
    let observable = this._httpService.getOne(id);
    observable.subscribe(data => {
      this.editTask = data
      this.updateTaskId = id
     })

   }
    
  }

  
  // getSharedPokemon() {
  //   let observable = this._httpService.getOne()
  //   observable.subscribe(data => {
  //     console.log("List of Pokemon who share that ability:")
  //     for (let i = 0; i < (data.pokemon).length; i++) {
  //       this.sharedPokemon.push(data.pokemon[i].pokemon)
  //     }
  //   });
  // }

//   onButtonClick(): void { 
//     console.log(`You just poked Charizard!`);
//     this.getSharedPokemon();
// }

// onButtonClickParam(str: String): void { 
//   let observable = this._httpService.pokemonPic(str)
//   observable.subscribe(data => {
//     this.pokeId = data.id;
//     this.pokeClicked = true
//   })
// }
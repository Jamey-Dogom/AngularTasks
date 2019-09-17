import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient){
      this.getTasks();
  }


  getTasks(){
    // our http response is an Observable, store it in a variable
    return this._http.get('/tasks');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log("Got our tasks!", data));
 }

 getOne(id){
  // our http response is an Observable, store it in a variable
  return this._http.get('/tasks/'+ id);
  // subscribe to the Observable and provide the code we would like to do with our data from the response
  // tempObservable.subscribe(data => console.log("Got 1 task", data));
}

addTask(newtask){
  return this._http.post('/tasks', newtask)
}

deleteTask(id){
  return this._http.delete('/tasks/' + id)
}

update(id, updateTask){
  return this._http.put('/tasks/' + id, updateTask)
}


}



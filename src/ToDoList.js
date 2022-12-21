/*
Bu ToDo list uygulaması, kullanıcı tarafından girilen görevlerin bir listesi oluşturur ve bu görevleri işaretleyebilir veya silebilir.

state adlı bir veri özelliği, görevlerin listesi ve görev girdisi için bir dize oluşturur.
Bu veri özelliği, handleChange ve handleSubmit adlı iki işleyici tarafından yönetilir.
handleChange işleyicisi, görev girdisinin değerini günceller ve handleSubmit işleyicisi, görev girdisini tasks listesine ekler ve görev girdisini sıfırlar.

handleCheck ve handleDelete işleyicileri, görevler listesindeki bir görevi işaretleyebilir veya silebilir.
render fonksiyonu, görevler listesini gösteren bir ul etiketi oluşturur ve her görev için bir li etiketi oluşturur.
Bu li etiketleri, işaretlenmişse sınıfı done olarak ayarlar ve her görev için bir işaret kutusu ve bir silme düğmesi oluşturur.
*/

import React from 'react';

class ToDoList extends React.Component {
  state = {
    tasks: [],
    task: ''
  };

  handleChange = event => {
    this.setState({
      task: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  
    this.setState({
      tasks: [...this.state.tasks, { name: this.state.task }],
      task: ''
    }, () => {
      console.log(this.state.tasks);
    });
  };
  


  handleCheck = index => {
    const tasks = [...this.state.tasks];
    tasks[index].done = !tasks[index].done;
    this.setState({
      tasks
    });
  };

  handleDelete = index => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({
      tasks
    });
  };

  render() {
    return (
        <div className="form-container">
        <form className="input-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Yapılacak görev"
            name="task"
            value={this.state.task}
            onChange={this.handleChange}
          />
          <button type="submit">Ekle</button>
        </form>
        <ul>
          {this.state.tasks.map((task, index) => (
            <li key={index} className={task.done ? 'done' : ''}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => this.handleCheck(index)}
              />
              {task.name}
              <button onClick={() => this.handleDelete(index)}>Sil</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ToDoList;
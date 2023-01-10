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
  /*
  "state" değişkeni, "tasks" adında bir dizi ve "task" adında bir metin alanı içerir. 
  "tasks" dizisi, localStorage'dan "tasks" anahtarına karşılık gelen değerini almaya çalışır. 
  Eğer bu anahtar yoksa "tasks" değişkeni boş bir dizi olarak ayarlanır.
  */
  state = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    task: ''
  };

  /*
  "componentDidUpdate" metodu, component güncellendiğinde "tasks" dizisini localStorage'a "tasks" anahtarıyla kaydeder.
  */
  componentDidUpdate() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }
  /*
  "handleChange" metodu, metin alanında yapılan değişiklikleri algılar ve "task" state değişkenini günceller.
  */
  handleChange = event => {
    this.setState({
      task: event.target.value
    });
  };
  /*
  "handleSubmit" formun gönderilmesi işlemi gerçekleştiğinde çalışır. 
  İlk olarak, "preventDefault()" sayfanın yenilenmesi engellemek için kullanılır. 
  Daha sonra, "setState" metodu kullanılarak state değişkenleri güncellenir
  */
  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      tasks: [...this.state.tasks, { name: this.state.task }],
      task: ''
    }, () => {
      console.log(this.state.tasks);
    });
  };
  /*
  "handleCheck" adında bir metot tanımlanır. Bu metot, "tasks" dizisindeki bir görevin tamamlandı/tamamlanmadı durumunu değiştirir.
  */
  handleCheck = index => {
    const tasks = [...this.state.tasks];
    tasks[index].done = !tasks[index].done;
    this.setState({
      tasks
    });
  };
  /*
  "handleDelete" metodu, "tasks" dizisinden belirli bir görevi siler.
  */
  handleDelete = index => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({
      tasks
    });
  };
  /*
  "render()" metodu, component'ın görünümünü oluşturur. 
  İçerisinde bir form ve bir liste bulunur. Form, metin alanı ve ekleme düğmesi içerir. 
  Liste ise "tasks" dizisindeki görevleri gösterir. 
  Görevlerin isimleri ve silme/tamamla düğmeleri liste elemanları içinde yer alır.
  */
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
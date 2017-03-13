$(function(){
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }
  function Column(name) { //klasa Column
    var self = this; // przyda się dla funkcji zagnieżdżonych

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      //tworzenie elementw
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('x');
      var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
      

      //podpinanie zdarzen
      $columnDelete.click(function() {
        self.removeColumn();
        });
       // Dodawanie karteczki po kliknięciu w przycisk:
      $columnAddCard.click(function(event) {
        self.addCard(new Card(prompt("Wpisz nazwę karty")));
        });
      
      //kontruowanie elementów koumny
      $column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);
      
      return $column;
    } //koniec klasy createColumn
   }
    //prototypowanie Column
    Column.prototype = {
      addCard: function(card) {
        this.$element.children('ul').append(card.$element);
        console.log('addCard');
      },
      removeColumn: function() {
        this.$element.remove();
      }
    };//konie prototpowania kolumn
  
  
  
    function Card(description) {
      var self = this; 
      
      this.id = randomString();
      this.description = description;
      this.$element = createCard();
      
              //tworzenie elementów card
      function createCard() {

        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.description);
        var $cardDelete = $('<button>'). addClass('btn-delete').text('x');
        
        //podpinanie zdarzen w card
        $cardDelete.click(function(){
          self.removeCard();
        }); //click usuwamy kartę
        
        //składnia i zwracanie karty
        $card.append($cardDelete)
          .append($cardDescription);
        return $card;
      }
     
    } //zamykanie klasy card
          //metoda prototypowania do klasy card
      Card.prototype = {
        removeCard: function() {
          this.$element.remove();
        }
      }
    
    var board = {
      name: 'Tablica Kanban',
      addColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
      },
      $element: $('#board .column-container')
     };
    
    function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

    
    //cllick na button Dodaj kolumnę
    $('.create-column').click(function(){
      var name = prompt('Wpisz nazwę kolumny');
      var column = new Column(name);
      board.addColumn(column);
    });
});

window.onload = function () {
    let countdownElement = document.querySelector('.spanTimer'),
        popupClose = document.querySelectorAll('.popup__close'),
        popupFailes = document.querySelector('.popup-failed'),
        popupSuccess = document.querySelector('.popup-success'),
        timerReload = document.querySelector('.timer__reload'),
        radioBtn = document.querySelectorAll('.radio-wrapper input[name="changeTheme"]'),
        getBody = document.querySelector('body'), 
        btn = document.querySelector('.btn'),
        finalTime = 15,
        currentTime = 1,
        ms = 1000,
        calculateSeconds = document.querySelector('.calculateSeconds'),
        seconds = ['секунду', 'секунды', 'секунд' ],
        interval;



    interval = setInterval(timerInterval, ms);



    // Функция, отвечающая за склонения в слове "секунда"
    function num2str(n, text_forms) {  
        n = Math.abs(n) % 100; let n1 = n % 10;
     
        if (n > 10 && n < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 == 1) { return text_forms[0]; }
        return text_forms[2];
    }





    // Полифил для el.matches()
    (function() {

        // проверяем поддержку
        if (!Element.prototype.matches) {
      
          // определяем свойство
          Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
      
        }
      
      })();


    // Полифил для el.closest()
    (function() {
        // проверяем поддержку браузером
        if (!Element.prototype.closest) {
      
          // если не поддерживается - реализуем
          Element.prototype.closest = function(css) {
            var node = this;
      
            while (node) {
              if (node.matches(css)) return node;
              else node = node.parentElement;
            }
            return null;
          };
        }
      
      })();

    
    
    // Таймер
    function timerInterval(){
        
        countdownElement.innerHTML =  (  `${(finalTime - currentTime)} ` );
        if (currentTime >= finalTime) {
            clearInterval(interval);
        } 
        
        if(currentTime === finalTime){
            currentTime = 1;
            countdownElement.innerHTML = '15';
            return popupFailes.classList.add('active');
        }

        currentTime++;
    }


    
    // Кнопка обновления таймера
    timerReload.addEventListener('click', function(){
        removeActiveClass(this);
        interval = setInterval(timerInterval, ms);
    });
        

    // Вывод поп-апа 
    btn.addEventListener('click', function() {
        calculateSeconds.innerHTML = (`${currentTime - 1}  ${num2str(currentTime - 1, seconds)}`);
        popupSuccess.classList.add('active');
        clearInterval(interval);
    });


    // Кнопка закрытия поп-апа
    for(let i = 0; i < popupClose.length; i++){
        popupClose[i].addEventListener('click', function(){
            removeActiveClass(this);
        });
    }


    // Удаление класса Active
    //  изначально я использовал parentNode.parentNode, но потом подумал, что, если мы вдруг решим переместить кнопку и она будет не в двух "шагах" от поп-апа который нужно закрыть - это не сработает, получается костыльно
    // здесь подходит el.closest(), но он не поддерживается IE и Safari, поэтому я использую полифил для него, который, в свою очередь, требует поддержки el.matches(), с поддержкой которого, как я понял, проблем быть не должно.
    //  Update: IE11 не знает что такое el.matches(), поэтому я добавил полифил и для него 
    function removeActiveClass(el){
        //let getWrapper = el.parentNode.parentNode; 
        let getWrapper = el.closest('.popup.active')
        getWrapper.classList.remove('active');
    }


    // Изменение глобальной цветовой темы
    for(let i = 0; i < radioBtn.length; i++){
        radioBtn[i].addEventListener('click', function(){
            
            if( this.getAttribute('value') == 'Day'  ){
                getBody.classList.remove('darkTheme')
            } else{
                getBody.classList.add('darkTheme')
            }
        });
    }

} // window.onload
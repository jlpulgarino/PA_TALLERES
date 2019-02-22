function loadScript(callback) {
  var s = document.createElement('script');
  console.log('Paso2.1');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
	console.log('Paso2.2');
    s.addEventListener('load', callback, false);
	console.log('Paso2.3');
  } else if (s.readyState) {
	console.log('Paso2.4');
    s.onreadystatechange = callback;
	console.log('Paso2.5');
  }
  console.log('Paso2.6');
  document.body.appendChild(s);
  console.log('Paso2.7');
}

function unleashGremlins(ttl, callback) {
  function stop() {
    horde.stop();
    callback();
  }
  var horde = window.gremlins.createHorde()
					.gremlin(gremlins.species.clicker().clickTypes(['click'])
													   .canClick(function(element) {
															var node = $(element)[0].nodeName;
															var clickables =  ['BUTTON', 'A'];
															return clickables.indexOf(node) >= 0;
														  })
														  )
					.gremlin(gremlins.species.formFiller().canFillElement(function(element){
															var node = $(element)[0].nodeName;
															var clickables =  ['INPUT'];
															return clickables.indexOf(node) >= 0;
					}));
  horde.seed(1234);

  horde.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');
	console.log('Paso1');
    browser.timeoutsAsyncScript(60000);
	console.log('Paso2');
    browser.executeAsync(loadScript);
	console.log('Paso3');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});
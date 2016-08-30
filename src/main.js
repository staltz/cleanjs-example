import xs from 'xstream';
import Cycle from '@cycle/xstream-run';
import {div, button, p, makeDOMDriver} from '@cycle/dom';

function main(sources) {
    const action$ = xs.merge(
        sources.DOM.select('.decrement').events('click').map(ev => -1),
        sources.DOM.select('.increment').events('click').map(ev => +1)
    );

    const count$ = action$.fold((x,y) => x + y, 0);

    const vdom$ = count$.map(count =>
        div([
            button('.decrement', 'Decrement'),
            button('.increment', 'Increment'),
            p('Counter: ' + count)
        ])
    );

    return {
        DOM: vdom$
    };
}

/* eslint-disable */
Cycle.run(main, {
    DOM: makeDOMDriver('#main-container')
});
/* eslint-enable */


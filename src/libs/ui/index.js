import Bar from './bar';
import Scale from './scale';
let Ui = {};
Ui.install = function (Vue) {
    Vue.component(Bar.name, Bar);
    Vue.component(Scale.name, Scale);
}
export default Ui
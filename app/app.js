import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

Ember.Route.reopen({
    activate: function() {
        var cssClass = this.toCssClass();
        if (cssClass !== 'application') {
            Ember.$('body').addClass(cssClass + '-route');
        }
    },
    deactivate: function() {
        var cssClass = this.toCssClass();
        Ember.$('body').removeClass(cssClass + '-route');
    },
    toCssClass: function() {
        return this.routeName.replace(/\./g, '-').dasherize();
    }
});

loadInitializers(App, config.modulePrefix);

export default App;

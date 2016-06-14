import Ember from 'ember';
import finders from '../mixins/blex/finders';
import mobilemenu from '../mixins/blex/mobile-menu';

export default Ember.Route.extend( finders, mobilemenu, {
  model: function(params){
      // Find the Post
      return this.findPostBySlug(params.slug);
  },
  setupController: function(controller, model){
      this._super(controller, model);

      // Setup some variables for the theme on the posts page
      controller.set('header',  this.peekPostBySlug("header") );
  }
});

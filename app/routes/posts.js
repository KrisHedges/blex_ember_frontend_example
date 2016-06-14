import Ember from 'ember';
import finders from '../mixins/blex/finders';
import mobilemenu from '../mixins/blex/mobile-menu';

export default Ember.Route.extend( finders, mobilemenu, {
  model: function(){
      // List all Posts that are not 'Pages' or 'Hidden' for some reason.
      return this.findAllPostsExcludingCategories(["Pages", "Hidden"]);
  },

  setupController: function(controller, model){
      this._super(controller, model);

      // Setup some variables for the theme on the posts page
      controller.set('header',  this.peekPostBySlug("header") );
  }
});

/* global $:FALSE */
import Ember from 'ember';
import finders from '../mixins/blex/finders';
import mobilemenu from '../mixins/blex/mobile-menu';

export default Ember.Route.extend( finders, mobilemenu, {
  model: function(){
      return this.findAllPosts();
  },

  setupController: function(controller, model){
      this._super(controller, model);

      // Setup some variables for the theme on the index page
      controller.set('latest_music_post', this.peekLatestByCategory("Music"));
      controller.set('latest_science_post', this.peekLatestByCategory("Science"));
      controller.set('latest_computer_post', this.peekLatestByCategory("Computers"));
      controller.set('header',  this.peekPostBySlug("header") );

      // Show or hide the bouncing "scroll for more" indicator on the full height image header.
      Ember.run.schedule('afterRender', this, function () {
          $("#main").scroll(function(){
              if ($(this).scrollTop() > $(window).height()/2){
                  $('header').addClass('scrolled');
              }
              if (($(this).scrollTop() < $(window).height()/2) && $('header').hasClass('scrolled')){
                  $('header').removeClass('scrolled');
              }
          });
      });
  }
});


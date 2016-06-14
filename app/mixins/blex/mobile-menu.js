/* global $:FALSE */
import Ember from 'ember';

// Used inside a route to hide mobile menu after transition.

// Example:
// import mobilemenu from '../mixins/blex/mobile-menu';
//
// export default Ember.Route.extend( mobilemenu, {

export default Ember.Mixin.create({
    setupController: function(controller, model){
        this._super(controller, model);
        Ember.run.schedule('afterRender', this, function () {
            $('ul a.active').closest('.parent').children('a').addClass('active');
            if ($('body').hasClass('show-route') && Ember.isEmpty($('.active'))){
                $('.all').addClass('active');
            }
        });
    },
    actions: {
        didTransition: function(){
            $('body').removeClass('mobile-menu-visible');
            $('.hamburger').removeClass('open');
            $('.active').removeClass('active');
        },
        loading: function(transition) {
            $('body').addClass('loading');
            transition.promise.finally(function() {
                $('body').removeClass('loading');
            });
        }
    }
});

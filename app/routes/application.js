import Ember from 'ember';
import finders from '../mixins/blex/finders';
import mobilemenu from '../mixins/blex/mobile-menu';
import treeify from '../mixins/blex/treeify';

export default Ember.Route.extend( finders, mobilemenu, treeify,  {
    setupNavPages: function(){
        var posts = this.peekAllByCategory("Pages");
        return this.treeify(posts, 'slug').sortBy('title');
    },

    setupController: function(controller, model){
        this._super(controller, model);

        // Setup Pages for Nav Application wide
        controller.set('pages', this.setupNavPages());
        controller.set('footer',  this.peekPostBySlug("footer") );
    }
});

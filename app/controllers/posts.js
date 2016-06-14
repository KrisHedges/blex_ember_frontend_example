import Ember from 'ember';
import paginate from '../mixins/blex/paginate';

export default Ember.Controller.extend( paginate, {
    page: 1,
    itemsPerPage: 1,

    pagedContent: Ember.computed(function(){
        let content = this.get('content'), items_per_page = this.itemsPerPage;
        return this.paginate(content, items_per_page);
    })
});

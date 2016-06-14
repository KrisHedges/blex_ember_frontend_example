import Ember from 'ember';

// Used inside a controller to provide the necessary vars for pagination
// and a paginate function to alter the models contents (which should be a collection)
// into a new paginated array. Iteratate over this new pagedContent in your templates.
// Your computed function should be named "pagedContent" and you should provide a
// default page to show if no params are provided called "page" in most cases this
// number should be 1 to show the first page.

// Example:
//import paginate from '../mixins/blex/paginate';

//export default Ember.Controller.extend( paginate, {
//    page: 1,
//    itemsPerPage: 1,

//    pagedContent: Ember.computed(function(){
//        let content = this.get('content'), items_per_page = this.itemsPerPage;
//        return this.paginate(content, items_per_page);
//    })

export default Ember.Mixin.create({
    queryParams: ["page"],

    paginate: function(arr, size){
        let i;
        let pages = [];
        for (i = 0; i < arr.length; i += size) {
            pages.push(arr.slice(i, i + size));
        }
        return pages;
    },

    pageContent: Ember.computed('pagedContent', 'page', function(){
        return this.get('pagedContent')[this.page -1];
    }),

    nextPage: Ember.computed('page', function(){
        return this.page + 1;
    }),

    previousPage: Ember.computed('page', function(){
        return this.page - 1;
    }),

    isFirstPage: Ember.computed('page', function(){
        return this.get('page') === 1;
    }),

    isLastPage: Ember.computed('pagedContent','page', function(){
        return this.get('page') === this.get('pagedContent.length');
    }),

    pageNumbers: Ember.computed('pagedContent', function(){
        let numbers = [], times = this.get('pagedContent.length');
        for(var i=1; i <= times; i++){
            numbers.push(i);
        }
        return numbers;
    })
});

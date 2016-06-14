import Ember from 'ember';

export default Ember.Mixin.create({
    // Used inside a route usually in the model.
    // Finders do just that. They do the finding by making a call to the API usually.

    // Finds and loads all categories and posts and returns the posts.
    findAllPosts: function(){
        return this.store.findAll("category").then(function(){
            return this.store.findAll("post");
        }.bind(this));
    },

    // Takes an array of category names as strings.
    // Finds and loads all categories and posts and returns only the posts from categories not given in the array.
    findAllPostsExcludingCategories: function(categories){
        return this.findAllPosts().then(function(posts){
            return posts.filter(function(post){
                return post.get('categories').any(function(cat){
                    return !categories.some(function(category) {
                        return cat.get('name') === category;
                    });
                });
            }).sortBy('published_at').reverse();
        });
    },

    // Takes a post.slug
    // Finds and loads all categories and posts and returns only the post with the matching slug.
    findPostBySlug: function(slug){
        return this.store.findAll("category").then(function(){
            return this.store.findAll('post').then( function(posts){
                let post = posts.filterBy('slug', slug).get('firstObject');
                return post;
            }.bind(this));
        }.bind(this));
    },

    // Used inside a route usually to setup some view variables or to filter on from actions.
    // Peeks assume the data you need is loaded and you want to filter
    // the existing store records for something more specific.

    // Takes a category name as a string and returns all of the posts of the category.
    peekAllByCategory: function(category){
        let posts = this.store.peekAll("category").findBy("name", category).get("posts").sortBy('published_at').reverse();
        return posts;
    },

    // Takes a category name as a string and returns the latest post of that category.
    peekLatestByCategory: function(category){
        let post = this.store.peekAll("category").findBy("name", category).get("posts").sortBy('published_at').reverse().get('firstObject');
        return post;
    },

    // Takes a post.slug
    // Finds and loads all categories and posts and returns only the post with the matching slug.
    peekPostBySlug: function(slug){
        let post = this.store.peekAll('post').findBy('slug', slug);
        return post;
    },

});

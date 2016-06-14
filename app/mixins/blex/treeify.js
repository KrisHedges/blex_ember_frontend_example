import Ember from 'ember';

export default Ember.Mixin.create({
    treeify: function(list, url_field) {
      var treeList = [];
      var lookup = {};

      list.forEach(function(obj) {
        lookup[obj.get(url_field)] = obj;
        Ember.set(obj, 'children', []);
      });

      list.forEach(function(obj) {
        if (obj.get('parent') !== "") {
          lookup[obj.get('parent')]['children'].push(obj);
        } else {
          treeList.push(obj);
        }
      });
      return treeList;
  }
});

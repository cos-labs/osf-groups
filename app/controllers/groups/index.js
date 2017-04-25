import Ember from 'ember';

export default Ember.Controller.extend({
  showInput: false,
  actions: {
    toggleShow() {
      this.toggleProperty('showInput');
    },
    addItem(name) {
      this.toggleProperty('showInput');
      const newGroup = {
        name: name,
        users: [],
        projects: []
      };
      const group = this.store.createRecord('group', newGroup);
      group.save();
    },
    addUser(user, group) {
      const groupId = group.id;
      this.store.findRecord('group', groupId).then(group => {
        const users = group.get('users');
        if (users) {
          if (!users.includes(user.id))
            group.set('users', users.concat([user.id]));
        } else {
          group.set('users', [user]);
        }
        group.save();
      });

    }
  }
});

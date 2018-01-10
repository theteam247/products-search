import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/goods/list/list';
import '../../ui/pages/goods/editor/editor'


// Set up all routes in the app
FlowRouter.route('/goods', {
  name: 'Goods',
  action() {
    BlazeLayout.render('App_body', { main: 'App_goods' });
  },
});

FlowRouter.route('/goods/editor', {
  name: 'GoodsEditor',
  action() {
    BlazeLayout.render('App_body', { main: 'App_goods_editor' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

var metrics = [
  { title: 'Requests', metric: cube.metric("sum(request)") },
  { title: 'Searches', metric: cube.metric("sum(search)") },
  { title: 'Logins', metric: cube.metric("sum(login)") },
  { title: 'New Users', metric: cube.metric("sum(newUser)") },
  { title: 'New Items', metric: cube.metric("sum(newItem)") },
  { title: 'Applications', metric: cube.metric("sum(comment)") },
  { title: 'Likes', metric: cube.metric("sum(likeItem)") },
  { title: 'User Selected', metric: cube.metric("sum(userSelected)") },
  { title: 'Item Accepted', metric: cube.metric("sum(itemAccepted)") },
  { title: 'Item Expired', metric: cube.metric("sum(itemExpired)") },
  { title: 'Messages', metric: cube.metric("sum(message)") },
  { title: 'Releases', metric: cube.metric("sum(release)") },
  { title: '500s', metric: cube.metric("sum(error.eq(type, '500'))") },
  { title: '404s', metric: cube.metric("sum(error.eq(type, '404'))") },
  { title: 'JS Errors', metric: cube.metric("sum(error.eq(type, 'js'))") }
];
setDashboardMetrics(metrics, true);

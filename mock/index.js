import Mock, { Random } from 'mockjs';

Mock.mock(/http:\/\/api.mock.com\/v1\/users.*/, 'get', req => {
  const { id } = queryParse(req.url);

  return Mock.mock({
    notify: Random.csentence(40, 100),
    })
});
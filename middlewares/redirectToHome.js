export default function (context) {
  if (context.route.path === '/') context.app.$router.replace({name: 'home'})
}
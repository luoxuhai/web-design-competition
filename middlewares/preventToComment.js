export default function(context) {
    if (/components/.test(context.route.path))
        context.app.$router.push({ name: 'error' });
}

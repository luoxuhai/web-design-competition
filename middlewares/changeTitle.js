export default function(context) {
    const query = context.route.query;
    const baseTitle = '网页设计大赛';
    let title = baseTitle;

    switch (context.route.name) {
        case 'articleId':
        case 'courseId':
            title = `${baseTitle}-${query.title}`;
    }
    document.title = title;
}

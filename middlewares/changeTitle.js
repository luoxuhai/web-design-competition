export default function(context) {
    const query = context.route.query;
    const baseTitle = '大国之窗';
    let title = baseTitle;

    switch (context.route.name) {
        case 'articleId':
        case 'courseId':
            title = `${query.title}-${baseTitle}`;
    }
    document.title = title;
}

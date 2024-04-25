/* eslint-disable */
const metadata = {
    fields: {
        post: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            createdAt: {
                name: 'createdAt',
                type: 'DateTime',
                attributes: [{ name: '@default', args: [] }],
            },
            updatedAt: {
                name: 'updatedAt',
                type: 'DateTime',
                attributes: [{ name: '@updatedAt', args: [] }],
            },
            title: {
                name: 'title',
                type: 'String',
            },
            published: {
                name: 'published',
                type: 'Boolean',
                attributes: [{ name: '@default', args: [{ value: false }] }],
            },
            authorId: {
                name: 'authorId',
                type: 'String',
            },
        },
    },
    uniqueConstraints: {
        post: {
            id: {
                name: 'id',
                fields: ['id'],
            },
        },
    },
    deleteCascade: {},
};
export default metadata;

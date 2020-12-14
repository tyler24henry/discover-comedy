import { FaRegLaugh as icon } from 'react-icons/fa';

export default {
    name: 'comedian',
    title: 'Comedians',
    type: 'document',
    icon,
    fields: [
        {
            name: 'firstName',
            title: 'First name',
            type: 'string',
        },
        {
            name: 'lastName',
            title: 'Last name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: doc => `${doc.firstName}-${doc.lastName}`,
                maxLength: 100,
            }
        },
        {
            name: 'profPic',
            title: 'Profile pic',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'text',
        },
        {
            name: 'bannerPic',
            title: 'Banner pic',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'twitter',
            title: 'Twitter handle',
            type: 'string',
        },
        {
            name: 'instagram',
            title: 'Instagram handle',
            type: 'string',
        },
        {
            name: 'facebook',
            title: 'Facebook handle',
            type: 'string',
        },
        {
            name: 'youtube',
            title: 'Youtube channel ID',
            type: 'string',
        },
        {
            name: 'website',
            title: 'Website URL',
            type: 'string',
        },
        {
            name: 'soundcloudUrl',
            title: 'Soundcloud URL',
            type: 'string',
        },
        {
            name: 'soundcloudType',
            title: 'Soundcloud type',
            type: 'string',
            description: 'Is it a podcast, bits, etc.',
        },
        {
            name: 'joke',
            title: 'Joke',
            type: 'string',
        },
    ],
    preview: {
        select: {
            firstName: 'firstName',
            lastName: 'lastName',
            media: 'profPic',
        },
        prepare: ({ firstName, lastName, media }) => {
            return {
                title: `${firstName ? firstName : 'Nacho'} ${lastName ? lastName : 'Man'}`,
                media,
            }
        }
    }
}
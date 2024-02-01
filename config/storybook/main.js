module.exports = {
    core: {
        builder: 'webpack5'
    },
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: ['@storybook/addon-toolbars', '@storybook/addon-essentials', '@storybook/addon-links', 'storybook-addon-designs']
};
